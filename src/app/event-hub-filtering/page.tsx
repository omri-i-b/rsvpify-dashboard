import EventHubConfigPanel from "@/components/event-hub/event-hub-config-panel";

export default function EventHubFilteringPage() {
  return (
    <div
      className="flex min-h-screen items-start justify-center py-12"
      style={{ background: "#f4f3ee" }}
    >
      <EventHubConfigPanel />
    </div>
  );
}
