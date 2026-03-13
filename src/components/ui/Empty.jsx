import { ShoppingCart } from 'lucide-react'

export function Empty({ icon: Icon = ShoppingCart, title, description, action }) {
  return (
    <div className="text-center py-12">
      <Icon className="w-16 h-16 mx-auto text-muted mb-4 opacity-50" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      {action}
    </div>
  )
}
