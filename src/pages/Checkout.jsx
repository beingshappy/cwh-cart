import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { Card } from '../components/ui/Card'
import { useStore } from '../store/useStore'
import { formatPrice } from '../lib/utils'
import { toast } from 'sonner'

const steps = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
  const navigate = useNavigate()
  const cartItems = useStore((state) => state.cartItems)
  const clearCart = useStore((state) => state.clearCart)

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    shippingMethod: 'standard',
  })

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const shipping = formData.shippingMethod === 'express' ? 15 : 0
  const total = subtotal + tax + shipping

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!')
    clearCart()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Checkout</h1>

        {/* Steps */}
        <div className="flex justify-between mb-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  idx <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {idx + 1}
              </div>
              <div
                className={`flex-1 h-1 mx-2 rounded-full ${
                  idx < currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {currentStep === 0 && (
                <Card className="space-y-6">
                  <h2 className="text-2xl font-bold">Shipping Address</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <Input
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />

                  <Input
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />

                  <Input
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <Input
                      placeholder="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                    <Input
                      placeholder="ZIP Code"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold">Shipping Method</h3>
                    <label className="flex items-center gap-3 p-3 rounded-lg border border-white/20 cursor-pointer hover:bg-white/5">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleInputChange}
                      />
                      <span>Standard Shipping - Free (5-7 days)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-lg border border-white/20 cursor-pointer hover:bg-white/5">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleInputChange}
                      />
                      <span>Express Shipping - $15 (2-3 days)</span>
                    </label>
                  </div>
                </Card>
              )}

              {currentStep === 1 && (
                <Card className="space-y-6">
                  <h2 className="text-2xl font-bold">Payment Method</h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold mb-3">Credit Card</h3>
                      <Input
                        placeholder="Cardholder Name"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Input
                      placeholder="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="MM/YY"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="CVC"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span className="text-sm">Save card for future use</span>
                    </label>
                  </div>
                </Card>
              )}

              {currentStep === 2 && (
                <Card className="space-y-6">
                  <h2 className="text-2xl font-bold">Order Review</h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold mb-2">Shipping To</h3>
                      <p className="text-muted-foreground">
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p className="text-muted-foreground">{formData.address}</p>
                      <p className="text-muted-foreground">
                        {formData.city}, {formData.state} {formData.zip}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <h3 className="font-bold mb-2">Items</h3>
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm mb-1">
                          <span>{item.name} x {item.quantity}</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>

            {/* Navigation */}
            <div className="flex gap-4 mt-8">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="flex-1">
                  Next
                </Button>
              ) : (
                <Button onClick={handlePlaceOrder} className="flex-1">
                  Place Order
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="max-h-64 overflow-y-auto space-y-2 border-b border-white/10 pb-4">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary text-lg">{formatPrice(total)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
