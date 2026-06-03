"use client";

import React from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  isNumeric?: boolean;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function Table<T>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <div className="table-wrapper">
      <table className="nm-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                style={{ textAlign: col.align || (col.isNumeric ? "right" : "left") }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center text-text-muted py-6">
                Нет данных для отображения
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "cursor-pointer" : ""}
              >
                {columns.map((col, colIdx) => {
                  const alignStyle = col.align || (col.isNumeric ? "right" : "left");
                  const cellValue = col.render ? col.render(row) : (row[col.key as keyof T] as unknown as React.ReactNode);
                  return (
                    <td
                      key={colIdx}
                      style={{ textAlign: alignStyle }}
                      className={col.isNumeric ? "mono-data" : ""}
                    >
                      {cellValue}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination select-none flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="page-item disabled:opacity-50 disabled:cursor-not-allowed border border-nm-border"
      >
        <CaretLeft size={16} />
      </button>

      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`page-item border border-nm-border ${currentPage === page ? "active text-secondary font-extrabold" : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="page-item disabled:opacity-50 disabled:cursor-not-allowed border border-nm-border"
      >
        <CaretRight size={16} />
      </button>
    </div>
  );
}
