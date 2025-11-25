import type { CartItem } from '../../types';
import { Button } from '../atoms/Button';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <div className="flex gap-4 border rounded-lg p-4">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="w-24 h-24 object-contain"
      />
      <div className="flex-1">
        <h3 className="font-semibold mb-2">{item.product.title}</h3>
        <p className="text-blue-600 font-bold mb-2">${item.product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            className="px-3 py-1"
          >
            -
          </Button>
          <span className="font-medium">{item.quantity}</span>
          <Button
            variant="secondary"
            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            className="px-3 py-1"
          >
            +
          </Button>
          <Button
            variant="danger"
            onClick={() => onRemove(item.product.id)}
            className="ml-auto"
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
