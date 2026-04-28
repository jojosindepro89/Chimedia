"use client";

import { Save, Lock } from "lucide-react";
import { useActionState } from "react";
import { updateAdminPassword } from "@/app/actions";

const initialState = {
    message: '',
    success: false,
}

export default function AdminSettingsPage() {
    const [state, formAction, isPending] = useActionState(updateAdminPassword, initialState);

    return (
        <div>
            <h1 className="text-3xl font-bold text-white uppercase mb-8">Site Settings & Security</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Settings (Dummy) */}
                <div className="bg-zinc-900 border border-white/10 rounded-sm p-8">
                    <h2 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                        General Settings
                    </h2>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Site Title</label>
                            <input type="text" defaultValue="cmhsports" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Contact Email</label>
                            <input type="email" defaultValue="support@cmhsports.com" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <h3 className="text-white font-bold mb-4 uppercase text-sm">Maintenance</h3>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-black text-primary focus:ring-primary" />
                                <span className="text-gray-300">Enable Maintenance Mode</span>
                            </label>
                        </div>

                        <button type="button" className="bg-primary text-black font-bold uppercase px-8 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </form>
                </div>

                {/* Security Settings */}
                <div className="bg-zinc-900 border border-white/10 rounded-sm p-8">
                    <h2 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" /> Change Password
                    </h2>
                    
                    {state?.message && (
                        <div className={`p-4 rounded-sm mb-6 text-sm font-bold border ${state.success ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                            {state.message}
                        </div>
                    )}

                    <form action={formAction} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Current Password</label>
                            <input name="currentPassword" type="password" required className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="••••••••" />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">New Password</label>
                            <input name="newPassword" type="password" minLength={6} required className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="••••••••" />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Confirm New Password</label>
                            <input name="confirmPassword" type="password" minLength={6} required className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="••••••••" />
                        </div>

                        <button disabled={isPending} className="bg-zinc-800 text-white font-bold uppercase px-8 py-3 rounded hover:bg-zinc-700 transition-colors flex items-center gap-2 disabled:opacity-50">
                            {isPending ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
