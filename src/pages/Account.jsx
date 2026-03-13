import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, ShoppingBag, Heart, MapPin, CreditCard, Settings, Trash2, ShoppingCart } from 'lucide-react'
import Button from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useStore } from '../store/useStore'
import { formatPrice } from '../lib/utils'
import { toast } from 'sonner'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile')
  const wishlist = useStore((state) => state.wishlist)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary/20 text-primary'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {activeTab === 'profile' && (
                <Card className="space-y-6">
                  <h2 className="text-2xl font-bold">Profile Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="john@example.com"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                      />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </Card>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {[1, 2, 3].map((order) => (
                    <Card key={order} className="flex justify-between items-center p-6">
                      <div>
                        <h3 className="font-bold">Order #{10000 + order}</h3>
                        <p className="text-sm text-muted-foreground">2024-01-{order < 10 ? '0' + order : order}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">$299.99</p>
                        <p className="text-sm text-green-400">Delivered</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">My Wishlist</h2>
                    <p className="text-sm text-muted-foreground">{wishlist.length} items</p>
                  </div>
                  
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {wishlist.map((item) => (
                        <Card key={item.id} className="group relative flex gap-4 p-4 hover:border-primary/30 transition-all">
                          <Link to={`/product/${item.id}`} className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <Link to={`/product/${item.id}`}>
                                <h3 className="font-bold text-sm md:text-base hover:text-primary transition-colors line-clamp-2 mb-1">{item.name}</h3>
                              </Link>
                              <p className="text-primary font-bold">{formatPrice(item.price || 0)}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                              <Button 
                                size="sm" 
                                className="flex-1 h-9"
                                onClick={() => {
                                  useStore.getState().addToCart(item, 1)
                                  toast.success(`${item.name} added to cart`)
                                }}
                              >
                                <ShoppingCart size={14} className="mr-2" /> Add
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="p-2 border border-white/10 hover:border-red-500/30 hover:text-red-500 transition-all"
                                onClick={() => {
                                  useStore.getState().toggleWishlist(item)
                                  toast.success(`${item.name} removed`)
                                }}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="text-center py-16 bg-white/5 border-dashed border-white/10">
                      <Heart className="w-16 h-16 mx-auto text-muted/30 mb-4 animate-pulse" />
                      <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground mb-8 text-sm">Save items you love and come back to them anytime.</p>
                      <Link to="/shop">
                        <Button variant="outline">Start Shopping</Button>
                      </Link>
                    </Card>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-4">
                  <Button>+ Add New Address</Button>
                  {[1, 2].map((addr) => (
                    <Card key={addr} className="p-6 flex justify-between">
                      <div>
                        <h3 className="font-bold">Home Address</h3>
                        <p className="text-muted-foreground text-sm">
                          {123 + addr * 10} Main Street, City, State 12345
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="space-y-4">
                  <Button>+ Add Payment Method</Button>
                  {[1, 2].map((card) => (
                    <Card key={card} className="p-6 flex justify-between">
                      <div>
                        <h3 className="font-bold">•••• •••• •••• {5000 + card * 100}</h3>
                        <p className="text-muted-foreground text-sm">Expires 12/2{card + 5}</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && (
                <Card className="space-y-6">
                  <h2 className="text-2xl font-bold">Settings</h2>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                      <span>Email Notifications</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                      <span>SMS Notifications</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                      <span>Marketing Emails</span>
                      <input type="checkbox" className="w-5 h-5" />
                    </label>
                  </div>
                  <Button variant="outline">Logout</Button>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
