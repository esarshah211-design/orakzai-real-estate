import React, { useState } from 'react';
import {
  X,
  Lock,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  MessageSquare,
  Phone,
  Building,
  Users,
  LogOut
} from 'lucide-react';
import { Property, CustomerInquiry, PropertyCity, PropertyType, PropertyStatus } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  inquiries: CustomerInquiry[];
  isLoggedIn: boolean;
  onLogin: (password: string) => Promise<boolean>;
  onLogout: () => void;
  onSaveProperty: (property: Partial<Property> & { id?: string }) => Promise<boolean>;
  onDeleteProperty: (id: string) => Promise<boolean>;
  onUpdateInquiryStatus: (id: string, status: 'Pending' | 'Contacted' | 'Closed') => Promise<boolean>;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  properties,
  inquiries,
  isLoggedIn,
  onLogin,
  onLogout,
  onSaveProperty,
  onDeleteProperty,
  onUpdateInquiryStatus
}) => {
  if (!isOpen) return null;

  // Login form state
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'properties' | 'inquiries'>('properties');

  // Property Editor form state
  const [editingProp, setEditingProp] = useState<Partial<Property> | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [propSaving, setPropSaving] = useState(false);
  const [propSuccessMsg, setPropSuccessMsg] = useState('');

  // Inquiry filter
  const [inquiryFilter, setInquiryFilter] = useState<'All' | 'Pending' | 'Contacted' | 'Closed'>('All');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const ok = await onLogin(password);
      if (!ok) {
        setLoginError('Invalid password. Please enter the authorized administrative password.');
      } else {
        setPassword('');
      }
    } catch {
      setLoginError('Login request failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const startNewProperty = () => {
    setIsCreatingNew(true);
    setEditingProp({
      title: '',
      location: 'WAPDA Town, Peshawar',
      city: 'WAPDA Town',
      propertyType: 'Residential Plot',
      priceInLac: 36.5,
      priceDisplay: 'PKR 36.5 Lac',
      area: '5 Marla',
      isDemoListing: true,
      status: 'Available',
      imageUrl: '/src/assets/images/prop_residential_plot_1793257685483.jpg',
      features: ['Underground Electricity', '40ft Paved Road', 'Clear Registry'],
      description: 'Prime plot with ready transfer in prestigious sector.',
      possessionStatus: 'Immediate Possession',
      sector: 'Sector B'
    });
  };

  const handleSavePropertyForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProp || !editingProp.title) return;
    setPropSaving(true);
    try {
      const ok = await onSaveProperty(editingProp);
      if (ok) {
        setPropSuccessMsg('Property listing saved successfully.');
        setIsCreatingNew(false);
        setEditingProp(null);
        setTimeout(() => setPropSuccessMsg(''), 4000);
      }
    } finally {
      setPropSaving(false);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter === 'All') return true;
    return inq.status === inquiryFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#13161c] border border-[#262b35] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262b35] bg-[#0d0f12]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold text-white tracking-wide">
              Orakzai Real Estate · Admin Management
            </span>
            {isLoggedIn && (
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                Authorized Session
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#262b35] text-xs text-neutral-300 hover:text-white hover:border-neutral-500 cursor-pointer"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#262b35] transition-colors cursor-pointer"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isLoggedIn ? (
            /* Login Gate */
            <div className="max-w-md mx-auto py-12 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#1a1e26] border border-[#262b35] text-[#c5a880] flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Owner Portal Login</h3>
                <p className="text-xs text-neutral-400">
                  Manage live listings, upload photos, change prices, and review customer inquiries.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                    Administrative Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter admin password (e.g. orakzai2026)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0b0c0e] border border-[#262b35] text-sm text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#c5a880]"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Default access: <code className="text-[#c5a880]">orakzai2026</code>
                  </p>
                </div>

                {loginError && (
                  <p className="text-xs text-red-400 bg-red-950/40 border border-red-900 p-2.5 rounded-lg">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-[#0b0c0e] bg-gradient-to-r from-[#d4af62] via-[#c5a880] to-[#b69252] hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  {isLoggingIn ? 'Verifying...' : 'Access Dashboard'}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Portal */
            <div className="space-y-6">
              {/* Top stats and tab selectors */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#262b35] pb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('properties');
                      setIsCreatingNew(false);
                      setEditingProp(null);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'properties'
                        ? 'bg-[#c5a880] text-[#0b0c0e]'
                        : 'text-neutral-400 hover:text-white hover:bg-[#1a1e26]'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Manage Properties ({properties.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('inquiries');
                      setIsCreatingNew(false);
                      setEditingProp(null);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'inquiries'
                        ? 'bg-[#c5a880] text-[#0b0c0e]'
                        : 'text-neutral-400 hover:text-white hover:bg-[#1a1e26]'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Customer Inquiries ({inquiries.length})</span>
                  </button>
                </div>

                {activeTab === 'properties' && !editingProp && (
                  <button
                    onClick={startNewProperty}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#0b0c0e] bg-[#c5a880] hover:bg-[#d4af62] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Property</span>
                  </button>
                )}
              </div>

              {propSuccessMsg && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{propSuccessMsg}</span>
                </div>
              )}

              {/* TAB 1: PROPERTIES MANAGER */}
              {activeTab === 'properties' && (
                <>
                  {editingProp ? (
                    /* Property Add / Edit Form */
                    <form onSubmit={handleSavePropertyForm} className="space-y-4 bg-[#0d0f12] p-5 rounded-xl border border-[#262b35]">
                      <div className="flex items-center justify-between pb-2 border-b border-[#262b35]">
                        <h4 className="font-serif text-lg font-bold text-white">
                          {isCreatingNew ? 'Create New Property Listing' : `Edit: ${editingProp.title}`}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProp(null);
                            setIsCreatingNew(false);
                          }}
                          className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                            Property Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingProp.title || ''}
                            onChange={(e) => setEditingProp({ ...editingProp, title: e.target.value })}
                            className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                            Exact Location &amp; Sector
                          </label>
                          <input
                            type="text"
                            required
                            value={editingProp.location || ''}
                            onChange={(e) => setEditingProp({ ...editingProp, location: e.target.value })}
                            className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                            City / Region Focus
                          </label>
                          <select
                            value={editingProp.city || 'WAPDA Town'}
                            onChange={(e) => setEditingProp({ ...editingProp, city: e.target.value as PropertyCity })}
                            className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                          >
                            <option value="WAPDA Town">WAPDA Town (Peshawar)</option>
                            <option value="Peshawar">Peshawar</option>
                            <option value="Nowshera">Nowshera</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                            Property Category
                          </label>
                          <select
                            value={editingProp.propertyType || 'Residential Plot'}
                            onChange={(e) => setEditingProp({ ...editingProp, propertyType: e.target.value as PropertyType })}
                            className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                          >
                            <option value="Residential Plot">Residential Plot</option>
                            <option value="House">House / Luxury Villa</option>
                            <option value="Investment Property">Investment Property</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                            Price in Lac (e.g. 36.5 for PKR 36.5 Lac)
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            value={editingProp.priceInLac || 36}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setEditingProp({
                                ...editingProp,
                                priceInLac: val,
                                priceDisplay: val >= 100 ? `PKR ${(val / 100).toFixed(2)} Crore` : `PKR ${val} Lac`
                              });
                            }}
                            className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                            Price Display String
                          </label>
                          <input
                            type="text"
                            value={editingProp.priceDisplay || ''}
                            onChange={(e) => setEditingProp({ ...editingProp, priceDisplay: e.target.value })}
                            className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                            Area / Land Dimensions (e.g. 5 Marla, 10 Marla, 1 Kanal)
                          </label>
                          <input
                            type="text"
                            value={editingProp.area || ''}
                            onChange={(e) => setEditingProp({ ...editingProp, area: e.target.value })}
                            className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                            Listing Status
                          </label>
                          <select
                            value={editingProp.status || 'Available'}
                            onChange={(e) => setEditingProp({ ...editingProp, status: e.target.value as PropertyStatus })}
                            className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                          >
                            <option value="Available">Available</option>
                            <option value="Under Offer">Under Offer</option>
                            <option value="Reserved">Reserved</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                            Image URL / Preset Architecture
                          </label>
                          <select
                            value={editingProp.imageUrl || ''}
                            onChange={(e) => setEditingProp({ ...editingProp, imageUrl: e.target.value })}
                            className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                          >
                            <option value="/src/assets/images/prop_residential_plot_1793257685483.jpg">Plot / Land Community</option>
                            <option value="/src/assets/images/prop_luxury_villa_1793257684935.jpg">10 Marla Luxury Modern Villa</option>
                            <option value="/src/assets/images/hero_luxury_villa_1793257684730.jpg">Contemporary Architectural Estate</option>
                            <option value="/src/assets/images/prop_commercial_investment_1793257686707.jpg">Commercial Boulevard Plaza</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                            Demonstration Listing Flag
                          </label>
                          <select
                            value={editingProp.isDemoListing ? 'yes' : 'no'}
                            onChange={(e) => setEditingProp({ ...editingProp, isDemoListing: e.target.value === 'yes' })}
                            className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                          >
                            <option value="yes">Yes (Demonstration Sample)</option>
                            <option value="no">No (Verified Genuine Live File)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                          Property Description
                        </label>
                        <textarea
                          rows={3}
                          value={editingProp.description || ''}
                          onChange={(e) => setEditingProp({ ...editingProp, description: e.target.value })}
                          className="w-full bg-[#13161c] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:border-[#c5a880]"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t border-[#262b35]">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProp(null);
                            setIsCreatingNew(false);
                          }}
                          className="px-4 py-2 rounded-lg text-xs text-neutral-300 hover:bg-[#1a1e26] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={propSaving}
                          className="px-5 py-2 rounded-lg text-xs font-semibold text-[#0b0c0e] bg-[#c5a880] hover:bg-[#d4af62] cursor-pointer"
                        >
                          {propSaving ? 'Saving...' : 'Save Listing'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Properties Table */
                    <div className="overflow-x-auto border border-[#262b35] rounded-xl">
                      <table className="w-full text-left text-xs text-neutral-300">
                        <thead className="bg-[#0d0f12] text-neutral-400 uppercase tracking-wider border-b border-[#262b35]">
                          <tr>
                            <th className="py-3 px-4">Property</th>
                            <th className="py-3 px-4">Location</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Type</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#262b35]">
                          {properties.map((prop) => (
                            <tr key={prop.id} className="hover:bg-[#1a1e26]/50">
                              <td className="py-3 px-4">
                                <div className="font-semibold text-white">{prop.title}</div>
                                <div className="text-[11px] text-neutral-500">
                                  {prop.area} {prop.isDemoListing && '· [Demo Listing]'}
                                </div>
                              </td>
                              <td className="py-3 px-4">{prop.location}</td>
                              <td className="py-3 px-4 font-mono font-medium text-[#c5a880]">
                                {prop.priceDisplay}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                                  prop.status === 'Available' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800' : 'bg-neutral-800 text-neutral-300'
                                }`}>
                                  {prop.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-neutral-400">{prop.propertyType}</td>
                              <td className="py-3 px-4 text-right space-x-2">
                                <button
                                  onClick={() => setEditingProp(prop)}
                                  className="p-1.5 text-neutral-300 hover:text-[#c5a880] transition-colors rounded hover:bg-[#262b35] cursor-pointer"
                                  title="Edit listing"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onDeleteProperty(prop.id)}
                                  className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors rounded hover:bg-[#262b35] cursor-pointer"
                                  title="Delete listing"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {/* TAB 2: INQUIRIES CRM */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  {/* Status Filters */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">Filter Inquiries:</span>
                    {(['All', 'Pending', 'Contacted', 'Closed'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setInquiryFilter(st)}
                        className={`px-3 py-1 text-xs rounded-md cursor-pointer transition-colors ${
                          inquiryFilter === st
                            ? 'bg-[#c5a880] text-[#0b0c0e] font-semibold'
                            : 'bg-[#1a1e26] text-neutral-300 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {filteredInquiries.length > 0 ? (
                    <div className="space-y-3">
                      {filteredInquiries.map((inq) => {
                        const waMsg = encodeURIComponent(
                          `Hello ${inq.fullName}, this is Orakzai Real Estate regarding your property inquiry for ${inq.propertyType} in ${inq.preferredLocation}.`
                        );
                        const clientWa = inq.phone.replace(/[^0-9]/g, '');
                        const waLink = `https://wa.me/${clientWa.startsWith('0') ? '92' + clientWa.slice(1) : clientWa}?text=${waMsg}`;

                        return (
                          <div
                            key={inq.id}
                            className="bg-[#0d0f12] border border-[#262b35] rounded-xl p-4 space-y-3 hover:border-neutral-600 transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262b35] pb-2">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-white text-sm">{inq.fullName}</span>
                                <span className="font-mono text-xs text-[#c5a880]">{inq.phone}</span>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-neutral-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                                <select
                                  value={inq.status}
                                  onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                                  className="bg-[#13161c] border border-[#262b35] text-[11px] text-white rounded px-2 py-0.5 cursor-pointer ml-2"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Closed">Closed</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-neutral-400">
                              <div><strong className="text-neutral-300">Category:</strong> {inq.propertyType}</div>
                              <div><strong className="text-neutral-300">Budget:</strong> {inq.budget}</div>
                              <div><strong className="text-neutral-300">Location:</strong> {inq.preferredLocation}</div>
                            </div>

                            {inq.propertyTitle && (
                              <div className="text-xs text-[#c5a880] bg-[#13161c] p-2 rounded border border-[#262b35]">
                                Referenced Listing: <strong>{inq.propertyTitle}</strong>
                              </div>
                            )}

                            {inq.message && (
                              <div className="text-xs text-neutral-300 bg-[#13161c] p-2.5 rounded border border-[#262b35] italic">
                                &ldquo;{inq.message}&rdquo;
                              </div>
                            )}

                            <div className="flex items-center justify-end gap-2 pt-1">
                              <a
                                href={`tel:${inq.phone}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#262b35] bg-[#13161c] text-xs text-neutral-200 hover:text-white"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                                <span>Call Client</span>
                              </a>
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-900 bg-emerald-950/40 text-xs text-emerald-300 hover:bg-emerald-900/60"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                                <span>WhatsApp Client</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-xs text-neutral-500">
                      No customer inquiries found for this status filter.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
