import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Check, Play, Trash, Info } from "@phosphor-icons/react";
import { RootState } from "../store";
import { 
  EventItem, 
  addEvent, 
  updateEventStatus, 
  resolveEvent, 
  deleteEvent 
} from "../store/slices/eventsSlice";
import CreateEventModal from "../components/events/CreateEventModal";
import ResolveEventModal from "../components/events/ResolveEventModal";

type FilterStatus = "ALL" | "ACTIVE" | "UNPUBLISHED" | "FINISHED" | "EXPIRATED";

export default function EventsList() {
  const dispatch = useDispatch();
  const eventList = useSelector((state: RootState) => state.events.list);
  
  // Status filter state
  const [filter, setFilter] = useState<FilterStatus>("ALL");
  
  // Modal states
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isResolveOpen, setIsResolveOpen] = useState(false);

  const filteredEvents = eventList.filter((e) => {
    if (e.status === "DELETED") return false; // Hide deleted events
    if (filter === "ALL") return true;
    return e.status === filter;
  });

  const handleCreateSave = (newEvent: EventItem) => {
    dispatch(addEvent(newEvent));
  };

  const handlePublish = (uuid: string) => {
    dispatch(updateEventStatus({ uuid, status: "ACTIVE" }));
  };

  const handleResolveTrigger = (event: EventItem) => {
    setSelectedEvent(event);
    setIsResolveOpen(true);
  };

  const handleResolveSave = (uuid: string, resolution: "YES" | "NO") => {
    dispatch(resolveEvent({ uuid, resolution }));
  };

  const handleDelete = (uuid: string) => {
    if (window.confirm("Вы уверены, что хотите удалить это событие?")) {
      dispatch(deleteEvent(uuid));
    }
  };

  const getStatusBadge = (status: EventItem["status"]) => {
    switch (status) {
      case "ACTIVE":
        return <span className="badge-nm badge-nm-success">Активно</span>;
      case "UNPUBLISHED":
        return <span className="badge-nm badge-nm-warning">Не опубл.</span>;
      case "EXPIRATED":
        return <span className="badge-nm badge-nm-danger">Ожидает расчет</span>;
      case "FINISHED":
        return <span className="badge-nm badge-nm-success border-success/30 bg-success/20">Рассчитано</span>;
      default:
        return <span className="badge-nm">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header and Add button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark mb-1">
            Управление предсказаниями
          </h1>
          <p className="text-sm text-text-muted">
            Создание новых событий предсказаний, публикация в ленту и расчет исходов ставок
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="btn-nm btn-nm-primary cursor-pointer"
        >
          <Plus size={18} weight="bold" /> Добавить событие
        </button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-3">
        {(["ALL", "ACTIVE", "UNPUBLISHED", "EXPIRATED", "FINISHED"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
              filter === status 
                ? "nm-card-inset text-secondary" 
                : "nm-card text-text-muted border-nm-border hover:shadow-soft-sm"
            }`}
          >
            {status === "ALL" 
              ? "Все" 
              : status === "ACTIVE" 
              ? "Активные" 
              : status === "UNPUBLISHED" 
              ? "Не опубликованные" 
              : status === "EXPIRATED" 
              ? "Ожидают расчета" 
              : "Рассчитанные"}
          </button>
        ))}
      </div>

      {/* Events Table Container */}
      <div className="nm-card p-6">
        <div className="overflow-x-auto">
          <table className="table-nm">
            <thead>
              <tr>
                <th>Категория</th>
                <th>Событие предсказания</th>
                <th>Коэффициенты</th>
                <th>Время экспирации</th>
                <th>Статус</th>
                <th style={{ textAlign: "right" }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-text-muted py-8 font-bold">
                    Предсказания не найдены
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.uuid}>
                    <td className="font-bold text-xs">{event.category}</td>
                    <td>
                      <span className="font-bold text-text-dark text-sm block max-w-sm truncate" title={event.name}>
                        {event.name}
                      </span>
                      {event.resolution && (
                        <span className="text-[10px] font-black text-success uppercase mt-0.5 block">
                          Победил исход: {event.resolution}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="text-xs text-text-muted block">ДА: <b className="text-text-dark mono-data">x{event.coefficientYes}</b></span>
                      <span className="text-xs text-text-muted block">НЕТ: <b className="text-text-dark mono-data">x{event.coefficientNo}</b></span>
                    </td>
                    <td className="text-xs">{new Date(event.expirationTime).toLocaleString()}</td>
                    <td>{getStatusBadge(event.status)}</td>
                    <td style={{ textAlign: "right" }}>
                      <div className="inline-flex gap-2">
                        {/* Publish Event */}
                        {event.status === "UNPUBLISHED" && (
                          <button
                            onClick={() => handlePublish(event.uuid)}
                            className="btn-nm p-2 border-nm-border cursor-pointer rounded-lg text-success"
                            title="Опубликовать событие"
                          >
                            <Play size={16} />
                          </button>
                        )}

                        {/* Settle Event */}
                        {(event.status === "ACTIVE" || event.status === "EXPIRATED") && (
                          <button
                            onClick={() => handleResolveTrigger(event)}
                            className="btn-nm p-2 border-nm-border cursor-pointer rounded-lg text-secondary"
                            title="Рассчитать исход"
                          >
                            <Check size={16} />
                          </button>
                        )}

                        {/* Delete Event */}
                        {event.status !== "FINISHED" && (
                          <button
                            onClick={() => handleDelete(event.uuid)}
                            className="btn-nm p-2 border-nm-border cursor-pointer rounded-lg text-danger"
                            title="Удалить"
                          >
                            <Trash size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateEventModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateSave}
      />

      <ResolveEventModal
        isOpen={isResolveOpen}
        onClose={() => {
          setIsResolveOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onResolve={handleResolveSave}
      />
    </div>
  );
}
