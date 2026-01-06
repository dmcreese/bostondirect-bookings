import React, { useMemo, useState } from "react";

/**
 * Boston Direct Rentals — FIRST DRAFT (dependency-free)
 *
 * Goal: make it RUN so you can see the website layout/flow.
 *
 * ✅ No Hospitable
 * ✅ No payments
 * ✅ No webhooks
 * ✅ No 3D libraries (shows a 3D placeholder card instead)
 * ✅ No shadcn/ui alias imports ("@/components/..."), no framer-motion
 *
 * This removes the most common console errors:
 * - Module not found: @react-three/fiber / drei / framer-motion / lucide-react
 * - Module not found: @/components/ui/* (alias not configured)
 */

<div className="p-4 mb-4 rounded-xl bg-black text-white">
  Tailwind is working ✅
</div>

const makeId = () => Math.random().toString(36).slice(2, 10);

const seed = () => [
  {
    id: "p1",
    name: "4 Family Building – Warner St",
    city: "Dorchester, MA",
    addressLine: "Dorchester, Massachusetts",
    buildingThumbUrl:
      "https://files.bostondirect-bookings.com/images/7%20Warner/7-9%20Warner%20Images.jpg",
    heroUrl:
      "https://files.bostondirect-bookings.com/images/7%20Warner/7-9%20Warner%20Images.jpg",
    photosByRoom: { kitchen: [], bathroom: [], living: [], dining: [], bedroom: [], other: [] },
    units: [],
  },
  {
    id: "p1b",
    name: "4 Family Building – Bernard",
    city: "Dorchester, MA",
    addressLine: "Dorchester, Massachusetts",
    buildingThumbUrl:
      "https://files.bostondirect-bookings.com/images/7%20Bernard/7-9%20Bernard.jpg",
    heroUrl:
      "https://files.bostondirect-bookings.com/images/7%20Bernard/7-9%20Bernard.jpg",
    photosByRoom: { kitchen: [], bathroom: [], living: [], dining: [], bedroom: [], other: [] },
    units: [],
  },
  {
    id: "p2",
    name: "2 Family Building, Dorchester Massachusetts",
    city: "Dorchester, MA",
    buildingThumbUrl:
      "https://files.bostondirect-bookings.com/images/143%20Erie/143%20Erie.jpg",
    heroUrl:
      "https://files.bostondirect-bookings.com/images/143%20Erie/143%20Erie.jpg",
    photosByRoom: { kitchen: [], bathroom: [], living: [], dining: [], bedroom: [], other: [] },
    units: [],
  },
  {
    id: "p3",
    name: "Single Family Building, Dorchester Massachusetts",
    city: "Dorchester, MA",
    buildingThumbUrl:
      "https://files.bostondirect-bookings.com/images/home/single-family.jpg",
    heroUrl:
      "https://files.bostondirect-bookings.com/images/home/single-family.jpg",
    photosByRoom: { kitchen: [], bathroom: [], living: [], dining: [], bedroom: [], other: [] },
    units: [],
  },
  {
    id: "p4",
    name: "5 Family Building, Hyde Park Massachusetts",
    city: "Hyde Park, MA",
    buildingThumbUrl:
      "https://files.bostondirect-bookings.com/images/home/5-family-a.jpg",
    heroUrl:
      "https://files.bostondirect-bookings.com/images/home/5-family-a.jpg",
    photosByRoom: { kitchen: [], bathroom: [], living: [], dining: [], bedroom: [], other: [] },
    units: [],
  },
  {
    id: "p5",
    name: "5 Family Building, Hyde Park Massachusetts",
    city: "Hyde Park, MA",
    buildingThumbUrl:
      "https://files.bostondirect-bookings.com/images/home/5-family-b.jpg",
    heroUrl:
      "https://files.bostondirect-bookings.com/images/home/5-family-b.jpg",
    photosByRoom: { kitchen: [], bathroom: [], living: [], dining: [], bedroom: [], other: [] },
    units: [],
  },
];

const HOME_LOGO_URL =
  "https://files.bostondirect-bookings.com/images/BostonDirect%20Logo/BostonDirect%20Logo.png";
const HOME_DOMAIN_TEXT = "BOSTON-DIRECTBOOKINGS.COM";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm">
      {children}
    </span>
  );
}

function Btn({ children, variant = "primary", onClick, disabled, type = "button" }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-800"
      : variant === "danger"
        ? "bg-red-600 text-white hover:bg-red-500"
        : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200";

  return (
    <button type={type} className={cx(base, styles)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function Card({ children, className }) {
  return <div className={cx("rounded-3xl border bg-white shadow-sm", className)}>{children}</div>;
}

function CardHeader({ title, subtitle, right }) {
  return (
    <div className="flex items-start justify-between gap-4 p-5">
      <div>
        <div className="text-lg font-bold text-zinc-900">{title}</div>
        {subtitle ? <div className="mt-1 text-sm text-zinc-500">{subtitle}</div> : null}
      </div>
      {right}
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-zinc-200" />;
}

function TopBar({ title, breadcrumbs, onHome, onAdmin }) {
  return (
    <div className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Btn variant="secondary" onClick={onHome}>Home</Btn>
          <Btn variant="secondary" onClick={onAdmin}>Admin</Btn>
          <div className="h-6 w-px bg-zinc-200" />
          <div>
            <div className="text-xs text-zinc-500">{breadcrumbs}</div>
            <div className="text-base font-bold text-zinc-900">{title}</div>
          </div>
        </div>
        <Pill>Prototype</Pill>
      </div>
    </div>
  );
}

function isVideoSrc(src) {
  const s = (src || "").toLowerCase().split("?")[0].split("#")[0];
  return s.endsWith(".mp4") || s.endsWith(".webm") || s.endsWith(".ogg") || s.endsWith(".mov") || s.endsWith(".m4v");
}

function isImageSrc(src) {
  const s = (src || "").toLowerCase().split("?")[0].split("#")[0];
  return s.endsWith(".jpg") || s.endsWith(".jpeg") || s.endsWith(".png") || s.endsWith(".webp");
}

function Hero({ backgroundUrl, title, subtitle, right }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-white">
      <div className="absolute inset-0">
        <img src={backgroundUrl} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/20" />

      {/* Force a consistent hero height so the right media can fill top-to-bottom */}
      <div className="relative grid min-h-[560px] grid-cols-1 items-stretch md:grid-cols-2">
        {/* LEFT */}
        <div className="p-8">
          <Pill>Boston Direct Rentals</Pill>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-base text-zinc-600 md:text-lg">{subtitle}</p>
          ) : null}
        </div>

        {/* RIGHT – full height media */}
        <div className="relative min-h-[560px]">
          {right}
        </div>
      </div>
    </div>
  );
}

function Placeholder3D({ label, videoUrl }) {
  // Full-bleed media: ALWAYS fills the container (no letterboxing / whitespace)
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {videoUrl ? (
        isVideoSrc(videoUrl) ? (
          <video
            src={videoUrl}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        ) : isImageSrc(videoUrl) ? (
          <img
            src={videoUrl}
            alt="Unit preview"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null
      ) : null}
    </div>
  );
}

function PropertyListItem({ p, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="flex w-full items-start gap-4 rounded-3xl border bg-white p-4 text-left shadow-sm transition hover:bg-zinc-50 active:scale-[0.99]"
    >
      <div className="h-20 w-24 overflow-hidden rounded-2xl border bg-zinc-50">
        {p.buildingThumbUrl ? (
          <img
            src={p.buildingThumbUrl}
            alt={p.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              // hide broken thumbnails without crashing preview
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </div>

      <div className="flex-1">
        <div className="text-base font-semibold text-zinc-900">{p.name}</div>
        <div className="mt-1 text-sm text-zinc-500">{p.addressLine || p.city}</div>
      </div>
    </button>
  );
}

function UnitCard({ u, onOpen }) {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-36">
        <img src={u.photos?.[0]} alt={u.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <div className="text-lg font-bold text-white">{u.name}</div>
          <div className="text-sm text-white/80">{u.beds} BR • {u.baths} BA • Sleeps {u.sleeps}</div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-zinc-600">Booked dates: {u.booked?.length ?? 0}</div>
          <Btn onClick={onOpen}>View Unit</Btn>
        </div>
      </div>
    </Card>
  );
}

function AvailabilityDemo({ booked = [] }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [msg, setMsg] = useState(null);

  const validate = () => {
    if (!start || !end) return { ok: false, text: "Select a start and end date." };
    if (end < start) return { ok: false, text: "End date must be after start date." };
    for (const b of booked) {
      if (b >= start && b <= end) return { ok: false, text: `That range includes a booked date (${b}).` };
    }
    return { ok: true, text: "Looks available (demo)!" };
  };

  return (
    <Card>
      <CardHeader title="Availability (demo)" subtitle="Demo dates only — real sync comes later." right={<Pill>Calendar</Pill>} />
      <Divider />
      <div className="grid gap-4 p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm font-semibold text-zinc-900">Check-in</span>
            <input
              type="date"
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
                setMsg(null);
              }}
              className="h-10 rounded-2xl border px-3 text-sm"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-semibold text-zinc-900">Check-out</span>
            <input
              type="date"
              value={end}
              onChange={(e) => {
                setEnd(e.target.value);
                setMsg(null);
              }}
              className="h-10 rounded-2xl border px-3 text-sm"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Btn variant="secondary" onClick={() => setMsg(validate())}>Check</Btn>
          {msg ? (
            <Pill>{msg.text}</Pill>
          ) : null}
        </div>
        <div className="text-xs text-zinc-500">Booked dates (demo): {booked.length ? booked.join(", ") : "none"}</div>
      </div>
    </Card>
  );
}

function RequestToBookDemo({ unitName }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  return (
    <>
      <Card>
        <CardHeader
          title="Request to Book (demo)"
          subtitle={`Send a request for ${unitName} (preview only).`}
          right={<Pill>Demo</Pill>}
        />
        <Divider />
        <div className="grid gap-3 p-5">
          <Btn
            onClick={() => {
              setOpen(true);
              setSent(false);
            }}
          >
            Open Request Form
          </Btn>
          <div className="text-xs text-zinc-500">
            Later we’ll route this to email/CRM and then replace with real booking.
          </div>
        </div>
      </Card>

      {open ? (
        <div
          className="fixed inset-0 z-30 grid place-items-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <div className="text-lg font-extrabold text-zinc-900">
                  Request to book — {unitName}
                </div>
                <div className="mt-1 text-sm text-zinc-500">
                  This is a demo form (no payments, no calendar sync).
                </div>
              </div>
              <Btn variant="secondary" onClick={() => setOpen(false)}>
                Close
              </Btn>
            </div>
            <Divider />
            <div className="p-5">
              {sent ? (
                <div className="rounded-2xl border bg-zinc-50 p-4 text-sm">✅ Request submitted (demo).</div>
              ) : (
                <div className="grid gap-3">
                  {[
                    { k: "name", label: "Name", ph: "Your name" },
                    { k: "email", label: "Email", ph: "you@email.com" },
                    { k: "phone", label: "Phone", ph: "(617) 000-0000" },
                    { k: "message", label: "Message", ph: "Dates, guests, questions..." },
                  ].map((f) => (
                    <label key={f.k} className="grid gap-1">
                      <span className="text-sm font-semibold text-zinc-900">{f.label}</span>
                      <input
                        value={form[f.k]}
                        onChange={(e) => setForm((p) => ({ ...p, [f.k]: e.target.value }))}
                        placeholder={f.ph}
                        className="h-10 rounded-2xl border px-3 text-sm"
                      />
                    </label>
                  ))}
                  <div className="flex gap-2">
                    <Btn
                      onClick={() => {
                        if (!form.name || !form.email) return;
                        setSent(true);
                      }}
                    >
                      Submit
                    </Btn>
                    <Btn variant="secondary" onClick={() => setOpen(false)}>
                      Cancel
                    </Btn>
                  </div>
                  <div className="text-xs text-zinc-500">(Demo) Requires name + email to submit.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function getUnitsForProperty(p) {
  // Property-page unit labels with explicit LEFT / RIGHT columns (per screenshot)
  if (!p) return { left: [], right: [] };

  if (p.id === "p1") {
    // Warner
    return {
      left: ["7W2 - Apartment", "7W1 - Apartment"],
      right: ["9W2 - Apartment", "9W1 - Apartment"],
    };
  }

  if (p.id === "p1b") {
    // Bernard
    return {
      left: ["7B2 - Apartment", "7B1 - Apartment"],
      right: ["9B2 - Apartment", "9B1 - Apartment"],
    };
  }

  return { left: [], right: [] };
}

function UnitsPanel({ property, onSelectUnitVideo }) {
  const { left, right } = getUnitsForProperty(property);

  const renderLabel = (label) => {
    // Bernard building unit video links
    if (property?.id === "p1b") {
      if (label === "9B2 - Apartment") {
        return (
          <button
            onClick={() => onSelectUnitVideo("https://files.bostondirect-bookings.com/images/7%20Bernard/9B2.mp4")}
            className="text-sm font-semibold text-blue-600 underline hover:text-blue-800"
          >
            {label}
          </button>
        );
      }
      if (label === "7B2 - Apartment") {
        return (
          <button
            onClick={() => onSelectUnitVideo("https://files.bostondirect-bookings.com/images/7%20Bernard/7B2%20only.png")}
            className="text-sm font-semibold text-blue-600 underline hover:text-blue-800"
          >
            {label}
          </button>
        );
      }
    }
    return <div className="text-sm font-semibold text-zinc-800">{label}</div>;
  };

  return (
    <div className="py-6">
      <div className="text-center">
        <div className="text-3xl font-extrabold text-zinc-900">Units In This Building</div>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-x-32 text-center">
        <div className="grid gap-6">
          {left.map((label) => (
            <div key={label}>{renderLabel(label)}</div>
          ))}
        </div>

        <div className="grid gap-6">
          {right.map((label) => (
            <div key={label}>{renderLabel(label)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyPhotosAdmin({ property, onUpdateProperty }) {
  const ROOM_LABELS = {
    kitchen: "Kitchen",
    bathroom: "Bathroom",
    living: "Living Room",
    dining: "Dining Room",
    bedroom: "Bedroom",
    other: "Other",
  };

  const rooms = Object.keys(ROOM_LABELS);
  const [room, setRoom] = useState("kitchen");
  const [url, setUrl] = useState("");

  const list = property?.photosByRoom?.[room] || [];

  const add = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    onUpdateProperty(property.id, (p) => {
      const current = p.photosByRoom?.[room] || [];
      return {
        ...p,
        photosByRoom: {
          ...(p.photosByRoom || {}),
          [room]: [trimmed, ...current],
        },
      };
    });
    setUrl("");
  };

  const removeAt = (idx) => {
    onUpdateProperty(property.id, (p) => {
      const current = p.photosByRoom?.[room] || [];
      const next = current.filter((_, i) => i !== idx);
      return { ...p, photosByRoom: { ...(p.photosByRoom || {}), [room]: next } };
    });
  };

  return (
    <Card>
      <CardHeader
        title="Property Photos (rooms)"
        subtitle="Add/remove photos for the whole building (kitchen, bathroom, living room, etc.)."
        right={<Pill>Photos</Pill>}
      />
      <Divider />
      <div className="grid gap-4 p-5">
        <div className="text-sm text-zinc-600">
          Tip: for local files, store in <span className="font-semibold">public/images/...</span> and reference like
          <span className="font-semibold"> /images/properties/9-warner/kitchen/01.jpg</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {rooms.map((r) => (
            <button
              key={r}
              onClick={() => setRoom(r)}
              className={cx(
                "rounded-2xl border px-3 py-2 text-sm font-semibold",
                room === r ? "bg-zinc-900 text-white" : "bg-white hover:bg-zinc-50"
              )}
            >
              {ROOM_LABELS[r]}
            </button>
          ))}
        </div>

        <div className="grid gap-2 md:grid-cols-[1fr_auto]">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste image URL or /images/... path"
            className="h-10 rounded-2xl border px-3 text-sm"
          />
          <Btn onClick={add} disabled={!url.trim()}>Add Photo</Btn>
        </div>

        {list.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {list.map((src, idx) => (
              <div key={idx} className="overflow-hidden rounded-2xl border">
                <div className="relative">
                  <img src={src} alt={`${ROOM_LABELS[room]} ${idx + 1}`} className="h-44 w-full object-cover" />
                  <div className="absolute right-2 top-2">
                    <Btn variant="danger" onClick={() => removeAt(idx)}>Remove</Btn>
                  </div>
                </div>
                <div className="p-3 text-xs text-zinc-500 break-all">{src}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border bg-zinc-50 p-4 text-sm text-zinc-600">
            No {ROOM_LABELS[room]} photos yet.
          </div>
        )}
      </div>
    </Card>
  );
}

function R2StorageAdmin({ r2Config, onSetR2Config }) {
  const DEFAULTS = {
    apiBaseUrl: "/api/r2", // your Cloudflare Worker routes (recommended)
    publicBaseUrl: "https://files.bostondirect-bookings.com", // where public files are served from
    rootPrefix: "images/", // acts like a folder in R2 (R2 uses object keys with prefixes)
  };

  const cfg = { ...DEFAULTS, ...(r2Config || {}) };
  const [draft, setDraft] = useState(cfg);
  const [prefix, setPrefix] = useState(cfg.rootPrefix || "images/");
  const [objects, setObjects] = useState([]);
  const [status, setStatus] = useState(null);
  const [uploadKey, setUploadKey] = useState("images/brand/");
  const [file, setFile] = useState(null);

  const save = () => {
    const next = {
      apiBaseUrl: (draft.apiBaseUrl || "/api/r2").trim().replace(/\/$/, ""),
      publicBaseUrl: (draft.publicBaseUrl || "").trim().replace(/\/$/, ""),
      rootPrefix: (draft.rootPrefix || "").trim(),
    };
    onSetR2Config(next);
    setStatus({ kind: "ok", text: "Saved. Now you can List / Upload." });
  };

  const list = async () => {
    setStatus({ kind: "info", text: "Listing…" });
    try {
      const p = (prefix || "").trim();
      const url = `${cfg.apiBaseUrl}/list?prefix=${encodeURIComponent(p)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`List failed (${res.status})`);
      const json = await res.json();
      setObjects(json.objects || []);
      setStatus({ kind: "ok", text: `Found ${(json.objects || []).length} object(s).` });
    } catch (e) {
      setStatus({ kind: "err", text: e?.message || "List failed" });
    }
  };

  const createFolder = async (folderPrefix) => {
    // R2 doesn’t have real folders — we create a “marker” object that ends with '/'
    const key = (folderPrefix || "").trim().replace(/^\/+/, "");
    if (!key.endsWith("/")) {
      setStatus({ kind: "err", text: "Folder key must end with / (example: images/brand/)" });
      return;
    }
    setStatus({ kind: "info", text: "Creating folder…" });
    try {
      const res = await fetch(`${cfg.apiBaseUrl}/mkdir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (!res.ok) throw new Error(`mkdir failed (${res.status})`);
      setStatus({ kind: "ok", text: `Folder created: ${key}` });
      await list();
    } catch (e) {
      setStatus({ kind: "err", text: e?.message || "mkdir failed" });
    }
  };

  const upload = async () => {
    if (!file) {
      setStatus({ kind: "err", text: "Choose a file first." });
      return;
    }
    const base = (uploadKey || "").trim().replace(/^\/+/, "");
    const key = base.endsWith("/") ? `${base}${file.name}` : base;

    setStatus({ kind: "info", text: `Uploading → ${key}` });
    try {
      // Recommended Worker route: POST /api/r2/upload?key=...
      const res = await fetch(`${cfg.apiBaseUrl}/upload?key=${encodeURIComponent(key)}`, {
        method: "POST",
        body: file,
      });
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      const json = await res.json();
      const publicUrl = json.publicUrl || (cfg.publicBaseUrl ? `${cfg.publicBaseUrl}/${key}` : "");
      setStatus({ kind: "ok", text: publicUrl ? `Uploaded! ${publicUrl}` : "Uploaded!" });
      await list();
    } catch (e) {
      setStatus({ kind: "err", text: e?.message || "Upload failed" });
    }
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ kind: "ok", text: "Copied link." });
    } catch {
      setStatus({ kind: "err", text: "Could not copy. (Browser blocked clipboard)" });
    }
  };

  const StatusPill = () => {
    if (!status) return null;
    const color =
      status.kind === "ok" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
      status.kind === "err" ? "bg-red-50 text-red-800 border-red-200" :
      "bg-zinc-50 text-zinc-700 border-zinc-200";
    return (
      <div className={cx("rounded-2xl border px-3 py-2 text-sm", color)}>
        {status.text}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader
        title="Cloudflare R2 Storage"
        subtitle="Connect Admin to your R2 bucket via a Cloudflare Worker (no secret keys in the browser)."
        right={<Pill>R2</Pill>}
      />
      <Divider />
      <div className="grid gap-4 p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="grid gap-1">
            <span className="text-sm font-semibold text-zinc-900">API base URL</span>
            <input
              value={draft.apiBaseUrl}
              onChange={(e) => setDraft((p) => ({ ...p, apiBaseUrl: e.target.value }))}
              placeholder="/api/r2 or https://your-worker-domain/api/r2"
              className="h-10 rounded-2xl border px-3 text-sm"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-semibold text-zinc-900">Public base URL</span>
            <input
              value={draft.publicBaseUrl}
              onChange={(e) => setDraft((p) => ({ ...p, publicBaseUrl: e.target.value }))}
              placeholder="https://files.bostondirect-bookings.com"
              className="h-10 rounded-2xl border px-3 text-sm"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-semibold text-zinc-900">Root prefix</span>
            <input
              value={draft.rootPrefix}
              onChange={(e) => setDraft((p) => ({ ...p, rootPrefix: e.target.value }))}
              placeholder="images/"
              className="h-10 rounded-2xl border px-3 text-sm"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Btn onClick={save}>Save Settings</Btn>
          <Btn variant="secondary" onClick={() => { setDraft(DEFAULTS); setPrefix(DEFAULTS.rootPrefix); setUploadKey("images/brand/"); }}>Reset</Btn>
          <StatusPill />
        </div>

        <Divider />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="grid gap-2">
            <div className="text-sm font-bold text-zinc-900">Directories (prefixes)</div>
            <div className="text-sm text-zinc-600">
              In R2, folders are just <span className="font-semibold">prefixes</span>. We create a marker object ending in <span className="font-semibold">/</span>.
            </div>

            <div className="grid gap-2 md:grid-cols-[1fr_auto]">
              <input
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="images/"
                className="h-10 rounded-2xl border px-3 text-sm"
              />
              <Btn variant="secondary" onClick={list}>List</Btn>
            </div>

            <div className="grid gap-2 md:grid-cols-[1fr_auto]">
              <input
                value={uploadKey}
                onChange={(e) => setUploadKey(e.target.value)}
                placeholder="images/brand/ (ends with /)"
                className="h-10 rounded-2xl border px-3 text-sm"
              />
              <Btn variant="secondary" onClick={() => createFolder(uploadKey)}>Create Folder</Btn>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-bold text-zinc-900">Upload</div>
            <div className="text-sm text-zinc-600">
              Choose a file and upload to the key path above. If it ends with <span className="font-semibold">/</span>, we append the filename.
            </div>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="h-10 rounded-2xl border bg-white px-3 text-sm"
            />
            <Btn onClick={upload} disabled={!file}>Upload to R2</Btn>
          </div>
        </div>

        <Divider />

        <div className="grid gap-2">
          <div className="text-sm font-bold text-zinc-900">Objects</div>
          {objects.length ? (
            <div className="grid gap-2">
              {objects.map((o) => {
                const key = o.key || "";
                const url = cfg.publicBaseUrl ? `${cfg.publicBaseUrl}/${key}` : "";
                return (
                  <div key={key} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white p-3">
                    <div className="min-w-[220px]">
                      <div className="text-sm font-semibold text-zinc-900 break-all">{key}</div>
                      <div className="text-xs text-zinc-500">{o.size != null ? `${o.size} bytes` : ""}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {url ? (
                        <>
                          <a className="rounded-2xl border bg-zinc-50 px-3 py-2 text-sm font-semibold hover:bg-zinc-100" href={url} target="_blank" rel="noreferrer">
                            Open
                          </a>
                          <Btn variant="secondary" onClick={() => copy(url)}>Copy URL</Btn>
                        </>
                      ) : (
                        <Pill>Set public base URL</Pill>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border bg-zinc-50 p-4 text-sm text-zinc-600">No objects listed yet.</div>
          )}
        </div>

        <div className="text-xs text-zinc-500">
          Note: This UI expects a Cloudflare Worker at <span className="font-mono">{cfg.apiBaseUrl}</span> with endpoints:
          <span className="font-mono"> GET /list?prefix=</span>, <span className="font-mono">POST /upload?key=</span>, <span className="font-mono">POST /mkdir</span>.
        </div>
      </div>
    </Card>
  );
}

function AdminModal({ open, onClose, properties, onAddProperty, onRemoveProperty, selectedProperty, onUpdateProperty, brandLogoSrc, onSetBrandLogoSrc, r2Config, onSetR2Config }) {
  const [tab, setTab] = useState("properties");
  const [logoDraft, setLogoDraft] = useState(brandLogoSrc || DEFAULT_BRAND_LOGO_SRC);

  const saveLogo = () => {
    const v = (logoDraft || "").trim();
    if (!v) return;
    onSetBrandLogoSrc(v);
    try {
      localStorage.setItem(BRAND_LOGO_STORAGE_KEY, v);
    } catch {}
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-5xl rounded-3xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <div className="text-lg font-extrabold text-zinc-900">Admin</div>
            <div className="mt-1 text-sm text-zinc-500">Manage properties + property photos (prototype).</div>
          </div>
          <Btn variant="secondary" onClick={onClose}>Close</Btn>
        </div>
        <Divider />

        <div className="flex flex-wrap gap-2 p-5">
          <button
            onClick={() => setTab("properties")}
            className={cx(
              "rounded-2xl border px-3 py-2 text-sm font-semibold",
              tab === "properties" ? "bg-zinc-900 text-white" : "bg-white hover:bg-zinc-50"
            )}
          >
            Properties
          </button>
          <button
            onClick={() => setTab("photos")}
            className={cx(
              "rounded-2xl border px-3 py-2 text-sm font-semibold",
              tab === "photos" ? "bg-zinc-900 text-white" : "bg-white hover:bg-zinc-50"
            )}
          >
            Property Photos
          </button>
          <button
            onClick={() => setTab("brand")}
            className={cx(
              "rounded-2xl border px-3 py-2 text-sm font-semibold",
              tab === "brand" ? "bg-zinc-900 text-white" : "bg-white hover:bg-zinc-50"
            )}
          >
            Brand
          </button>
          <button
            onClick={() => setTab("r2")}
            className={cx(
              "rounded-2xl border px-3 py-2 text-sm font-semibold",
              tab === "r2" ? "bg-zinc-900 text-white" : "bg-white hover:bg-zinc-50"
            )}
          >
            Storage (R2)
          </button>
        </div>

        <div className="grid gap-4 p-5 pt-0">
          {tab === "properties" ? (
            <AdminPanelDemo properties={properties} onAdd={onAddProperty} onRemove={onRemoveProperty} />
          ) : null}

          {tab === "photos" ? (
            selectedProperty ? (
              <PropertyPhotosAdmin property={selectedProperty} onUpdateProperty={onUpdateProperty} />
            ) : (
              <Card>
                <CardHeader
                  title="Property Photos"
                  subtitle="Open a property first, then come back here to manage its room photos."
                  right={<Pill>Info</Pill>}
                />
                <Divider />
                <div className="p-5 text-sm text-zinc-600">No property selected.</div>
              </Card>
            )
          ) : null}

          {tab === "brand" ? (
            <Card>
              <CardHeader
                title="Brand (Logo / Video)"
                subtitle="Set the public URL to your brand media (image OR video). Saved in this browser."
                right={<Pill>Brand</Pill>}
              />
              <Divider />
              <div className="grid gap-3 p-5">
                <div className="text-sm text-zinc-600">
                  Tip: you can use a hosted URL (R2) like <span className="font-semibold">https://files.bostondirect-bookings.com/...</span>
                </div>

                <label className="grid gap-1">
                  <span className="text-sm font-semibold text-zinc-900">Brand media URL</span>
                  <input
                    value={logoDraft}
                    onChange={(e) => setLogoDraft(e.target.value)}
                    placeholder="https://... (png/jpg/mp4) or /images/..."
                    className="h-10 rounded-2xl border px-3 text-sm"
                  />
                </label>

                <div className="flex flex-wrap items-center gap-2">
                  <Btn onClick={saveLogo} disabled={!logoDraft.trim()}>Save</Btn>
                  <Btn
                    variant="secondary"
                    onClick={() => {
                      setLogoDraft(DEFAULT_BRAND_LOGO_SRC);
                      onSetBrandLogoSrc(DEFAULT_BRAND_LOGO_SRC);
                      try {
                        localStorage.setItem(BRAND_LOGO_STORAGE_KEY, DEFAULT_BRAND_LOGO_SRC);
                      } catch {}
                    }}
                  >
                    Reset to Default
                  </Btn>
                  <Pill>Current: {brandLogoSrc || DEFAULT_BRAND_LOGO_SRC}</Pill>
                </div>

                <Divider />

                <div className="grid gap-2">
                  <div className="text-sm font-bold text-zinc-900">Preview</div>
                  <div className="overflow-hidden rounded-3xl border bg-white p-4">
                    {isVideoSrc((brandLogoSrc || DEFAULT_BRAND_LOGO_SRC).trim()) ? (
                      <div className="grid gap-2">
                        <div className="overflow-hidden rounded-3xl border bg-zinc-50">
                          <video
                            src={(brandLogoSrc || DEFAULT_BRAND_LOGO_SRC).trim()}
                            className="mx-auto w-full max-w-3xl object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                          />
                        </div>
                        <a
                          href={(brandLogoSrc || DEFAULT_BRAND_LOGO_SRC).trim()}
                          target="_blank"
                          rel="noreferrer"
                          className="text-center text-xs font-semibold text-zinc-700 underline"
                        >
                          Open video in new tab
                        </a>
                      </div>
                    ) : (
                      <img
                        src={(brandLogoSrc || DEFAULT_BRAND_LOGO_SRC).trim()}
                        alt="Boston Direct Rentals"
                        className="mx-auto w-full max-w-md object-contain"
                        onError={() => {}}
                      />
                    )}
                    <div className="mt-2 text-xs text-zinc-500 text-center font-mono break-all">
                      {(brandLogoSrc || DEFAULT_BRAND_LOGO_SRC).trim()}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : null}

          {tab === "r2" ? (
            <R2StorageAdmin r2Config={r2Config} onSetR2Config={onSetR2Config} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function AdminPanelDemo({ properties, onAdd, onRemove }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("Boston, MA");
  const [heroUrl, setHeroUrl] = useState("");

  return (
    <Card>
      <CardHeader title="Add / Remove Properties (demo)" subtitle="In-memory only — for previewing the website." right={<Pill>Admin</Pill>} />
      <Divider />
      <div className="grid gap-4 p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="grid gap-1">
            <span className="text-sm font-semibold text-zinc-900">Property name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="123 Main St" className="h-10 rounded-2xl border px-3 text-sm" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-semibold text-zinc-900">City</span>
            <input value={city} onChange={(e) => setCity(e.target.value)} className="h-10 rounded-2xl border px-3 text-sm" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-semibold text-zinc-900">Hero image URL</span>
            <input value={heroUrl} onChange={(e) => setHeroUrl(e.target.value)} placeholder="https://..." className="h-10 rounded-2xl border px-3 text-sm" />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Btn
            onClick={() => {
              const trimmed = name.trim();
              if (!trimmed) return;
              onAdd({
                id: makeId(),
                name: trimmed,
                city: city || "Boston, MA",
                heroUrl:
                  heroUrl ||
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80",
                photosByRoom: { kitchen: [], bathroom: [], living: [], dining: [], bedroom: [], other: [] },
                units: [],
              });
              setName("");
              setHeroUrl("");
            }}
          >
            Add Property
          </Btn>
          <Pill>Properties: {properties.length}</Pill>
        </div>

        <Divider />

        <div className="grid gap-2">
          <div className="text-sm font-bold text-zinc-900">Remove</div>
          <div className="grid gap-2 md:grid-cols-2">
            {properties.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 rounded-2xl border p-3">
                <div>
                  <div className="font-semibold text-zinc-900">{p.name}</div>
                  <div className="text-xs text-zinc-500">{p.city}</div>
                </div>
                <Btn variant="danger" onClick={() => onRemove(p.id)}>Remove</Btn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// BRAND LOGO
// Default (recommended):
//   public/images/brand/boston-direct-rentals.png  →  /images/brand/boston-direct-rentals.png
// You can change the path in the UI: Admin → Brand.
const DEFAULT_BRAND_LOGO_SRC = "https://files.bostondirect-bookings.com/images/7%20Warner/7%20Warner%20outside.mp4";
const BRAND_LOGO_STORAGE_KEY = "bdr_brand_logo_src";

// R2 ADMIN SETTINGS (saved in browser)
const R2_STORAGE_KEY = "bdr_r2_config";

export default function App() {
  const [properties, setProperties] = useState(seed());
  const [adminOpen, setAdminOpen] = useState(false);

  const [brandLogoSrc, setBrandLogoSrc] = useState(() => {
    try {
      const saved = localStorage.getItem(BRAND_LOGO_STORAGE_KEY);
      return saved || DEFAULT_BRAND_LOGO_SRC;
    } catch {
      return DEFAULT_BRAND_LOGO_SRC;
    }
  });

  const [r2Config, setR2Config] = useState(() => {
    try {
      const raw = localStorage.getItem(R2_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const setR2ConfigSafe = (next) => {
    setR2Config(next);
    try {
      localStorage.setItem(R2_STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  // navigation state
  const [page, setPage] = useState("home");
  const [activeVideoUrl, setActiveVideoUrl] = useState(null); // home | property | unit
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const selectedProperty = useMemo(
    () => properties.find((p) => p.id === selectedPropertyId) || null,
    [properties, selectedPropertyId]
  );

  const selectedUnit = useMemo(() => {
    if (!selectedProperty) return null;
    return selectedProperty.units.find((u) => u.id === selectedUnitId) || null;
  }, [selectedProperty, selectedUnitId]);

  const breadcrumbs = useMemo(() => {
    if (page === "home") return "Homepage";
    if (page === "property") return `Homepage / ${selectedProperty?.name ?? "Property"}`;
    if (page === "unit") return `Homepage / ${selectedProperty?.name ?? "Property"} / ${selectedUnit?.name ?? "Unit"}`;
    return "";
  }, [page, selectedProperty, selectedUnit]);

  const title = useMemo(() => {
    if (page === "home") return "Choose a Property";
    if (page === "property") return selectedProperty?.name || "Property";
    if (page === "unit") return selectedUnit?.name || "Unit";
    return "";
  }, [page, selectedProperty, selectedUnit]);

  const goHome = () => {
    setPage("home");
    setSelectedPropertyId(null);
    setSelectedUnitId(null);
  };

  const openProperty = (id) => {
    setSelectedPropertyId(id);
    setSelectedUnitId(null);
    setActiveVideoUrl(null);
    setPage("property");
  };

  const openUnit = (unitId) => {
    setSelectedUnitId(unitId);
    setPage("unit");
  };

  const addProperty = (p) => setProperties((prev) => [p, ...prev]);

  // Update a property by id using an updater function (used for room photos)
  const updateProperty = (propertyId, updater) => {
    setProperties((prev) => prev.map((p) => (p.id === propertyId ? updater(p) : p)));
  };

  const removeProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    if (selectedPropertyId === id) goHome();
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <TopBar title={title} breadcrumbs={breadcrumbs} onHome={goHome} onAdmin={() => setAdminOpen(true)} />

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6">
        {page === "home" ? (
          <>
            <div className="grid gap-6">
              <div className="grid place-items-center gap-2 pt-2">
                <img
                  src={HOME_LOGO_URL}
                  alt="Boston Direct Bookings"
                  className="w-full max-w-[260px] object-contain"
                  onError={(e) => {
                    // If the logo fails to load, hide it (no crash)
                    e.currentTarget.style.display = "none";
                  }}
                />
                <a
                  href="#"
                  className="text-xs font-bold uppercase tracking-widest text-fuchsia-700 underline"
                >
                  {HOME_DOMAIN_TEXT}
                </a>
              </div>

              <div className="grid gap-4">
                {properties.slice(0, 20).map((p) => (
                  <PropertyListItem key={p.id} p={p} onOpen={() => openProperty(p.id)} />
                ))}
              </div>
            </div>
          </>
        ) : null}

        {page === "property" && selectedProperty ? (
          <>
            <div className="flex items-center gap-2">
              <Btn variant="secondary" onClick={goHome}>← Back</Btn>
            </div>

            <Hero
              backgroundUrl={selectedProperty.heroUrl}
              title={selectedProperty.name}
              subtitle={null}
              right={
                <Placeholder3D
                  label="3D Property View"
                  videoUrl={
                    activeVideoUrl ||
                    (selectedProperty.id === "p1b"
                      ? "https://files.bostondirect-bookings.com/images/7%20Bernard/7-9%20Bernard%203D.mp4"
                      : "https://files.bostondirect-bookings.com/images/7%20Warner/7%20Warner%20outside.mp4")
                  }
                />
              }
            />

            <UnitsPanel property={selectedProperty} onSelectUnitVideo={setActiveVideoUrl} />
          </>
        ) : null}

        {page === "unit" && selectedProperty && selectedUnit ? (
          <>
            <div className="flex items-center gap-2">
              <Btn variant="secondary" onClick={() => setPage("property")}>← Back to Units</Btn>
              <Pill>{selectedUnit.beds} BR • {selectedUnit.baths} BA • Sleeps {selectedUnit.sleeps}</Pill>
            </div>

            <Hero
              backgroundUrl={selectedUnit.photos?.[0] || selectedProperty.heroUrl}
              title={`${selectedProperty.name} — ${selectedUnit.name}`}
              subtitle="Unit page → 3D placeholder + availability demo + request form."
              right={<Placeholder3D label="3D Unit View" />}
            />

            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader title="Photos" subtitle="Preview gallery" right={<Pill>Gallery</Pill>} />
                  <Divider />
                  <div className="grid gap-3 p-5 md:grid-cols-2">
                    {(selectedUnit.photos || []).map((src, idx) => (
                      <div key={idx} className="overflow-hidden rounded-2xl border">
                        <img src={src} alt={`Photo ${idx + 1}`} className="h-52 w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="grid gap-4">
                <AvailabilityDemo booked={selectedUnit.booked || []} />
                <RequestToBookDemo unitName={selectedUnit.name} />
              </div>
            </div>
          </>
        ) : null}
      </main>

      {page !== "property" ? (
        <footer className="mx-auto max-w-6xl px-4 pb-8">
          <div className="mt-6 rounded-3xl border bg-white p-5 text-sm text-zinc-600">
            <div className="font-bold text-zinc-900">Next steps (after preview)</div>
            <ul className="mt-2 list-disc pl-5">
              <li>Add real 3D models per building/unit</li>
              <li>Connect real availability</li>
              <li>Add real booking + payments</li>
            </ul>
          </div>
        </footer>
      ) : null}

      <AdminModal
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        properties={properties}
        onAddProperty={addProperty}
        onRemoveProperty={removeProperty}
        selectedProperty={selectedProperty}
        onUpdateProperty={updateProperty}
        brandLogoSrc={brandLogoSrc}
        onSetBrandLogoSrc={setBrandLogoSrc}
        r2Config={r2Config}
        onSetR2Config={setR2ConfigSafe}
      />
    </div>
  );
}
