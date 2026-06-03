import React from "react";
import EventDetailClient from "./EventDetailClient";

export async function generateStaticParams() {
  // Returns a fallback list of paths to compile the static page shell.
  // This allows the static compiler to build the HTML shell.
  return [{ uuid: "demo" }];
}

interface PageProps {
  params: Promise<{ uuid: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <EventDetailClient uuid={resolvedParams.uuid} />;
}
