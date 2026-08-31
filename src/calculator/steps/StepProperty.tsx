import { AREA_MAX, AREA_MIN, PRICING } from '../../data/pricing'
import { LOCATIONS, PROPERTY_STATUSES, PROPERTY_TYPES } from '../../data/projects'
import { useCalculator } from '../useCalculator'
import { OptionRow } from '../components/OptionRow'

const CODES = ['A', 'B', 'C', 'D']

export function StepProperty() {
  const { state, dispatch } = useCalculator()
  const { config } = state
  const area = config.area

  const presets = config.projectType
    ? {
        full: [45, 65, 85, 120],
        bathroom: [4, 6, 8, 12],
        kitchen: [8, 12, 16, 20],
        rooms: [15, 25, 35, 50],
        other: [15, 25, 40, 60],
      }[config.projectType]
    : [45, 65, 85, 120]

  const minArea = config.projectType ? PRICING.minAreas[config.projectType] : null
  const maxArea = config.projectType ? PRICING.maxAreas[config.projectType] : null
  const effectiveNote =
    area !== null && minArea !== null && area < minArea
      ? `A becslésnél legalább ${minArea} m²-rel számolunk.`
      : area !== null && maxArea !== null && area > maxArea
        ? `A becslésnél legfeljebb ${maxArea} m²-rel számolunk.`
        : null

  const areaError =
    area !== null && (Number.isNaN(area) || area < AREA_MIN || area > AREA_MAX)
      ? `Adj meg ${AREA_MIN} és ${AREA_MAX} m² közötti értéket.`
      : null

  return (
    <div className="flex flex-col gap-10">
      <fieldset>
        <legend className="eyebrow">01 — Ingatlan típusa</legend>
        <div className="mt-3 flex flex-col gap-3">
          {PROPERTY_TYPES.map((option, i) => (
            <OptionRow
              key={option.id}
              name="property-type"
              code={CODES[i]}
              title={option.label}
              description={option.description}
              selected={config.propertyType === option.id}
              onSelect={() => dispatch({ type: 'setPropertyType', value: option.id })}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow">02 — Érintett alapterület</legend>
        <div className="mt-3">
          <label htmlFor="area-input" className="field-label">
            Hány négyzetméterre terjed ki a felújítás?
          </label>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex items-baseline gap-2 border-b-2 border-line-strong pb-1 transition-colors focus-within:border-clay">
              <input
                id="area-input"
                type="number"
                inputMode="numeric"
                min={AREA_MIN}
                max={AREA_MAX}
                value={area ?? ''}
                onChange={(e) =>
                  dispatch({
                    type: 'setArea',
                    value: e.target.value === '' ? null : Number(e.target.value),
                  })
                }
                placeholder="pl. 65"
                aria-describedby={areaError ? 'area-error' : undefined}
                aria-invalid={areaError ? true : undefined}
                className="w-24 bg-transparent font-mono text-3xl font-medium text-ink outline-none placeholder:text-ink-faint"
              />
              <span className="font-mono text-xl text-ink-soft" aria-hidden="true">
                m²
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pb-1.5" role="group" aria-label="Gyors értékek">
              {presets.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => dispatch({ type: 'setArea', value })}
                  className={`h-9 border px-3 font-mono text-[13px] transition-colors duration-200 ${
                    area === value
                      ? 'border-ink bg-ink text-paper'
                      : 'border-line-strong text-ink-soft hover:border-ink hover:text-ink'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          {areaError ? (
            <p id="area-error" className="field-error" role="alert">
              {areaError}
            </p>
          ) : effectiveNote ? (
            <p className="mt-2 text-[13px] text-ink-soft">{effectiveNote}</p>
          ) : (
            <p className="mt-2 text-[13px] text-ink-faint">
              A pontos értéket te ismered legjobban — a becslés ehhez igazodik.
            </p>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow">03 — Helyszín</legend>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {LOCATIONS.map((option, i) => (
            <OptionRow
              key={option.id}
              name="location"
              code={CODES[i]}
              title={option.label}
              selected={config.location === option.id}
              onSelect={() => dispatch({ type: 'setLocation', value: option.id })}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow">04 — Az ingatlan állapota</legend>
        <div className="mt-3 flex flex-col gap-3">
          {PROPERTY_STATUSES.map((option, i) => (
            <OptionRow
              key={option.id}
              name="property-status"
              code={CODES[i]}
              title={option.label}
              description={option.description}
              selected={config.propertyStatus === option.id}
              onSelect={() => dispatch({ type: 'setPropertyStatus', value: option.id })}
            />
          ))}
        </div>
      </fieldset>
    </div>
  )
}
