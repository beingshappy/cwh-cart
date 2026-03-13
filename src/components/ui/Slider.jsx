export function Slider({ value, onValueChange, min, max, step }) {
  return (
    <div className="space-y-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => onValueChange([value[0], Number(e.target.value)])}
        className="w-full"
      />
    </div>
  )
}
