import type { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (!payload) return null;
  if (!payload[0]) return null;

  if (active) {
    return (
      <div className="hidden h-full rounded-lg border bg-white text-sm sm:block">
        <p className="border-b px-4 py-2 font-medium">
          {
            // eslint-disable-next-line
            payload[0].payload.timestamp
          }
        </p>
        <div className="px-4 py-2">
          {payload?.map((entry, i) => {
            return (
              <div
                key={`tooltip-${i}`}
                className="flex w-48 items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-3 w-3 items-center justify-center rounded-full shadow">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                  </div>
                  <p className="text-slate-600">{entry.name}</p>
                </div>
                <p className="label">
                  {typeof entry.value == "number"
                    ? Math.round(entry.value)
                    : entry.value}{" "}
                  W
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
