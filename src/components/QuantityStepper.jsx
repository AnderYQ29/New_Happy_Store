import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "../store/cartStore";

const QuantityStepper = ({ value, onChange, min = 1, label = "Cantidad" }) => (
  <div className="stepper" role="group" aria-label={label}>
    <button
      type="button"
      onClick={() => onChange(value - 1)}
      disabled={value <= min}
      aria-label="Quitar una unidad"
    >
      <Minus size={16} aria-hidden="true" />
    </button>

    <span aria-live="polite">{value}</span>

    <button
      type="button"
      onClick={() => onChange(value + 1)}
      disabled={value >= MAX_QUANTITY}
      aria-label="Agregar una unidad"
    >
      <Plus size={16} aria-hidden="true" />
    </button>
  </div>
);

export default QuantityStepper;
