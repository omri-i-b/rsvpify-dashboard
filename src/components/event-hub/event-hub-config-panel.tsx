"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import {
  CalendarIcon,
  ChevronDownIcon,
  GripVerticalIcon,
  XIcon,
} from "lucide-react";

// ─── Design tokens (matching the prototype's warm neutral palette) ────
const T = {
  panelBg: "#ffffff",
  pageBg: "#f4f3ee",
  border: "#e6e3dc",
  borderStr: "#d8d4cb",
  ink: "#1a1a1f",
  ink2: "#5b5a62",
  ink3: "#8a8892",
  field: "#fafaf7",
  accent: "oklch(0.42 0.14 285)",
  accentSoft: "oklch(0.42 0.14 285 / 0.08)",
};

// ─── Section (collapsible) ───────────────────────────────────────────
function Section({
  title,
  badge,
  hint,
  defaultOpen = true,
  children,
}: {
  title: string;
  badge?: string | null;
  hint?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${T.border}` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer select-none items-center gap-2"
        style={{ padding: "12px 14px" }}
      >
        <span className="text-[13px] font-semibold" style={{ color: T.ink, letterSpacing: -0.1 }}>
          {title}
        </span>
        {badge && (
          <span
            className="rounded px-1.5 py-0.5 text-[10.5px] font-semibold uppercase"
            style={{
              color: T.accent,
              background: T.accentSoft,
              letterSpacing: 0.4,
            }}
          >
            {badge}
          </span>
        )}
        <span className="flex-1" />
        <span
          className="inline-block text-[10px] transition-transform duration-150"
          style={{
            color: T.ink3,
            transform: `rotate(${open ? 0 : -90}deg)`,
          }}
        >
          ▼
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 14px 14px" }}>
          {hint && (
            <p
              className="text-xs leading-[1.45]"
              style={{ color: T.ink2, marginBottom: 12, marginTop: -2 }}
            >
              {hint}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Form atoms ──────────────────────────────────────────────────────
function Label({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium" style={{ color: T.ink }}>
      <span>
        {children}
        {optional && (
          <span className="font-normal" style={{ color: T.ink3 }}>
            {" "}
            · optional
          </span>
        )}
      </span>
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  multiline,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <Tag
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={multiline ? 2 : undefined}
      className="w-full rounded-md text-[13px] outline-none"
      style={{
        padding: "8px 10px",
        color: T.ink,
        background: T.field,
        border: `1px solid ${T.border}`,
        fontFamily: "inherit",
        resize: "none",
      }}
    />
  );
}

function Radio({
  checked,
  onChange,
  label,
  sublabel,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  sublabel?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 py-[7px]">
      <span
        className="relative mt-0.5 shrink-0 rounded-full transition-colors duration-100"
        style={{
          width: 16,
          height: 16,
          border: `1.5px solid ${checked ? T.accent : T.borderStr}`,
          background: "#fff",
        }}
      >
        {checked && (
          <span
            className="absolute rounded-full"
            style={{ inset: 3, background: T.accent }}
          />
        )}
      </span>
      <span className="flex-1 leading-[1.35]">
        <span className="text-[13px]" style={{ color: T.ink }}>
          {label}
        </span>
        {sublabel && (
          <span className="mt-0.5 block text-[11.5px]" style={{ color: T.ink2 }}>
            {sublabel}
          </span>
        )}
      </span>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5">
      <span
        className="flex shrink-0 items-center justify-center rounded"
        style={{
          width: 16,
          height: 16,
          border: `1.5px solid ${checked ? T.accent : T.borderStr}`,
          background: checked ? T.accent : "#fff",
        }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path
              d="M2 5.2L4 7L8 3"
              fill="none"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="text-[13px]">{label}</span>
    </label>
  );
}

// ─── Filter row (with drag grip + toggle) ────────────────────────────
function FilterRow({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className="mb-1.5 flex items-center gap-2.5 rounded-[7px]"
      style={{
        padding: "9px 10px",
        border: `1px solid ${T.border}`,
        background: disabled ? "#fbfaf6" : "#fff",
        opacity: disabled ? 0.55 : 1,
      }}
    >
      <span
        className="flex flex-col gap-0.5 px-0.5"
        style={{
          cursor: disabled ? "default" : "grab",
          color: T.ink3,
        }}
      >
        <GripVerticalIcon size={12} />
      </span>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        size="sm"
        disabled={disabled}
      />
      <span className="flex-1 text-[13px]">{label}</span>
    </div>
  );
}

// ─── Multi-select chips ──────────────────────────────────────────────
function ChipsSelect({
  values,
  onAdd,
  onRemove,
  placeholder,
  suggestions,
}: {
  values: string[];
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
  placeholder: string;
  suggestions: string[];
}) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const available = suggestions.filter((s) => !values.includes(s));

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer flex-wrap items-center gap-1 rounded-md text-[13px]"
        style={{
          minHeight: 34,
          padding: "5px 8px",
          background: T.field,
          border: `1px solid ${T.border}`,
        }}
      >
        {values.length === 0 ? (
          <span className="pl-0.5" style={{ color: T.ink3 }}>
            {placeholder}
          </span>
        ) : (
          values.map((v) => (
            <span
              key={v}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(v);
              }}
              className="inline-flex items-center gap-1 rounded-full text-xs font-medium"
              style={{
                background: T.accentSoft,
                color: T.accent,
                padding: "2px 6px 2px 8px",
              }}
            >
              {v}
              <XIcon size={10} className="opacity-70" />
            </span>
          ))
        )}
        <span className="flex-1" />
        <ChevronDownIcon size={12} style={{ color: T.ink3 }} />
      </button>
      {open && (
        <div
          className="absolute top-[calc(100%+4px)] right-0 left-0 z-10 max-h-[180px] overflow-auto rounded-[7px] p-1"
          style={{
            background: "#fff",
            border: `1px solid ${T.border}`,
            boxShadow: "0 6px 24px rgba(20,15,10,0.10)",
          }}
        >
          {available.length === 0 ? (
            <div className="p-2 text-xs" style={{ color: T.ink3 }}>
              All added
            </div>
          ) : (
            available.map((s) => (
              <button
                key={s}
                onClick={() => onAdd(s)}
                className="block w-full cursor-pointer rounded-[5px] text-left text-[13px] transition-colors hover:bg-[#f4f3ee]"
                style={{ padding: "7px 10px" }}
              >
                {s}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── Date range select ───────────────────────────────────────────────
type DateOption = {
  value?: string;
  label?: string;
  divider?: boolean;
};

function DateRangeSelect({
  value,
  dateFrom,
  dateTo,
  onChange,
  options,
}: {
  value: string;
  dateFrom: string;
  dateTo: string;
  onChange: (v: { value: string; dateFrom?: string; dateTo?: string }) => void;
  options: DateOption[];
}) {
  const [open, setOpen] = React.useState(false);
  const [draftFrom, setDraftFrom] = React.useState(dateFrom);
  const [draftTo, setDraftTo] = React.useState(dateTo);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  React.useEffect(() => {
    setDraftFrom(dateFrom);
    setDraftTo(dateTo);
  }, [dateFrom, dateTo]);

  const isCustom = value === "custom";
  const fmt = (s: string) => {
    if (!s) return "";
    const d = new Date(s + "T00:00:00");
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };
  const label = isCustom
    ? dateFrom && dateTo
      ? `${fmt(dateFrom)} → ${fmt(dateTo)}`
      : "Custom range…"
    : (options.find((o) => o.value === value)?.label ?? "Select range");

  const inputCls =
    "w-full min-w-0 rounded-md border bg-white px-1.5 py-[7px] text-[11.5px] outline-none";

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center gap-2 rounded-md text-[13px]"
        style={{
          padding: "8px 10px",
          color: value ? T.ink : T.ink3,
          background: T.field,
          border: `1px solid ${T.border}`,
        }}
      >
        <CalendarIcon size={13} style={{ color: T.ink3 }} />
        <span className="flex-1 truncate text-left">{label}</span>
        <ChevronDownIcon size={12} style={{ color: T.ink3 }} />
      </button>
      {open && (
        <div
          className="absolute top-[calc(100%+4px)] right-0 left-0 z-10 rounded-[7px] p-1"
          style={{
            background: "#fff",
            border: `1px solid ${T.border}`,
            boxShadow: "0 6px 24px rgba(20,15,10,0.10)",
          }}
        >
          {options.map((o, i) =>
            o.divider ? (
              <div
                key={`d${i}`}
                className="mx-1 my-1"
                style={{ height: 1, background: T.border }}
              />
            ) : (
              <button
                key={o.value}
                onClick={() => {
                  onChange({ value: o.value! });
                  setOpen(false);
                }}
                className="block w-full cursor-pointer rounded-[5px] text-left text-[13px] transition-colors hover:bg-[#f4f3ee]"
                style={{
                  padding: "7px 10px",
                  background: o.value === value ? T.accentSoft : "transparent",
                  color: o.value === value ? T.accent : T.ink,
                }}
              >
                {o.label}
              </button>
            )
          )}
          {/* Custom range section */}
          <div className="mx-1 my-1" style={{ height: 1, background: T.border }} />
          <div
            className="rounded-[5px] px-2 pt-1.5 pb-2"
            style={{
              background: isCustom ? T.accentSoft : "transparent",
            }}
          >
            <div
              className="mb-1.5 text-[11px] font-semibold uppercase"
              style={{
                color: isCustom ? T.accent : T.ink3,
                letterSpacing: 0.3,
              }}
            >
              Custom range
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5">
              <input
                type="date"
                value={draftFrom}
                onChange={(e) => setDraftFrom(e.target.value)}
                className={inputCls}
                style={{
                  color: T.ink,
                  borderColor: T.border,
                  fontFamily: "inherit",
                }}
              />
              <span className="text-xs" style={{ color: T.ink3 }}>
                →
              </span>
              <input
                type="date"
                value={draftTo}
                onChange={(e) => setDraftTo(e.target.value)}
                className={inputCls}
                style={{
                  color: T.ink,
                  borderColor: T.border,
                  fontFamily: "inherit",
                }}
              />
            </div>
            <button
              disabled={!draftFrom || !draftTo}
              onClick={() => {
                onChange({
                  value: "custom",
                  dateFrom: draftFrom,
                  dateTo: draftTo,
                });
                setOpen(false);
              }}
              className="mt-2 block w-full rounded-[5px] text-center text-[12.5px] font-semibold"
              style={{
                padding: "7px 10px",
                cursor: draftFrom && draftTo ? "pointer" : "not-allowed",
                background: draftFrom && draftTo ? T.accent : "#e8e5dd",
                color: draftFrom && draftTo ? "#fff" : T.ink3,
              }}
            >
              Apply range
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main panel ──────────────────────────────────────────────────────
export default function EventHubConfigPanel() {
  const [title, setTitle] = React.useState("Upcoming events");
  const [desc, setDesc] = React.useState("");
  const [pickMode, setPickMode] = React.useState<"all" | "criteria">("all");

  const [criteria, setCriteria] = React.useState({
    date: "all",
    dateFrom: "",
    dateTo: "",
    hidePast: true,
    tags: ["Workshop"] as string[],
    location: [] as string[],
  });

  const [letFilter, setLetFilter] = React.useState(true);
  const [filters, setFilters] = React.useState({
    date: true,
    tags: true,
    location: true,
    type: false,
  });

  const isCriteria = pickMode === "criteria";

  return (
    <div
      className="overflow-hidden rounded-[10px] text-[13px]"
      style={{
        width: 320,
        background: T.panelBg,
        border: `1px solid ${T.border}`,
        color: T.ink,
        boxShadow: "0 1px 2px rgba(20,15,10,0.04)",
      }}
    >
      {/* Heading */}
      <Section title="Heading">
        <Label>Title</Label>
        <TextInput value={title} onChange={setTitle} />
        <div className="h-3" />
        <Label optional>Description</Label>
        <TextInput
          value={desc}
          onChange={setDesc}
          placeholder="A short intro shown above the list"
          multiline
        />
      </Section>

      {/* Which events to show */}
      <Section
        title="Events"
        hint="Show every event by default, or narrow the list by date, tags, or location."
      >
        <Radio
          checked={!isCriteria}
          onChange={() => setPickMode("all")}
          label="Show all events"
          sublabel="Past and upcoming, newest first"
        />
        <Radio
          checked={isCriteria}
          onChange={() => setPickMode("criteria")}
          label="Match specific criteria"
          sublabel="Only events matching the rules below"
        />

        {isCriteria && (
          <div className="mt-3">
            <Label>Date</Label>
            <DateRangeSelect
              value={criteria.date}
              dateFrom={criteria.dateFrom}
              dateTo={criteria.dateTo}
              onChange={({ value, dateFrom, dateTo }) =>
                setCriteria((c) => ({
                  ...c,
                  date: value,
                  dateFrom: dateFrom !== undefined ? dateFrom : c.dateFrom,
                  dateTo: dateTo !== undefined ? dateTo : c.dateTo,
                }))
              }
              options={[
                { value: "all", label: "Any date" },
                { value: "today", label: "Today" },
                { value: "thisWeek", label: "Current week" },
                { value: "thisMonth", label: "Current month" },
                { divider: true },
                { value: "next7", label: "Next 7 days" },
                { value: "next30", label: "Next 30 days" },
                { value: "next3mo", label: "Next 3 months" },
              ]}
            />
            <div className="mt-2 mb-1">
              <Checkbox
                checked={criteria.hidePast}
                onChange={() =>
                  setCriteria((c) => ({ ...c, hidePast: !c.hidePast }))
                }
                label="Hide events with a date in the past"
              />
            </div>
            <div className="h-1.5" />

            <Label>Tags</Label>
            <ChipsSelect
              values={criteria.tags}
              placeholder="Select tags"
              onAdd={(t) =>
                setCriteria((c) => ({ ...c, tags: [...c.tags, t] }))
              }
              onRemove={(t) =>
                setCriteria((c) => ({
                  ...c,
                  tags: c.tags.filter((x) => x !== t),
                }))
              }
              suggestions={[
                "Workshop",
                "Talk",
                "Meetup",
                "Webinar",
                "Conference",
              ]}
            />
            <div className="h-2.5" />

            <Label>Location</Label>
            <ChipsSelect
              values={criteria.location}
              placeholder="Select cities"
              onAdd={(v) =>
                setCriteria((c) => ({ ...c, location: [...c.location, v] }))
              }
              onRemove={(v) =>
                setCriteria((c) => ({
                  ...c,
                  location: c.location.filter((x) => x !== v),
                }))
              }
              suggestions={[
                "Online",
                "San Francisco",
                "Los Angeles",
                "New York",
                "Chicago",
                "Austin",
                "Seattle",
                "London",
              ]}
            />
          </div>
        )}
      </Section>

      {/* Visitor filters */}
      <Section
        title="Visitor filters"
        hint="Let visitors narrow the list themselves, in addition to the rules above."
      >
        <div className="flex items-center justify-between py-1 pb-2.5">
          <span className="text-[13px] font-medium">Show filter bar</span>
          <Switch checked={letFilter} onCheckedChange={setLetFilter} />
        </div>
        <div
          style={{
            opacity: letFilter ? 1 : 0.4,
            pointerEvents: letFilter ? "auto" : "none",
          }}
        >
          <FilterRow
            label="Date range"
            checked={filters.date}
            onChange={(v) => setFilters((f) => ({ ...f, date: v }))}
          />
          <FilterRow
            label="Tags"
            checked={filters.tags}
            onChange={(v) => setFilters((f) => ({ ...f, tags: v }))}
          />
          <FilterRow
            label="Location"
            checked={filters.location}
            onChange={(v) => setFilters((f) => ({ ...f, location: v }))}
          />
          <FilterRow
            label="Event type"
            checked={filters.type}
            onChange={(v) => setFilters((f) => ({ ...f, type: v }))}
          />
        </div>
      </Section>
    </div>
  );
}
