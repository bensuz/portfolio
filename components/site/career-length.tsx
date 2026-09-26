import { profile } from "@/lib/content";

function since(start: string, now = new Date()) {
  const from = new Date(start);
  const months = (now.getFullYear() - from.getFullYear()) * 12 + now.getMonth() - from.getMonth();
  return { years: Math.floor(months / 12), months: months % 12 };
}

// Time in the industry. The home page regenerates daily, so this stays current.
export default function CareerLength() {
  const value = since(profile.careerStart);
  return (
    <span>
      {value.years}
      <small>yr{value.years === 1 ? "" : "s"}</small> {value.months}
      <small>mo</small>
    </span>
  );
}
