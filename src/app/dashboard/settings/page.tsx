import Link from "next/link";
import { ArrowLeft, Save, User, Mail, Lock } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="flex min-h-screen bg-black text-white">
            <div className="flex-1 p-8">
                <Link href="/dashboard" className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-bold uppercase tracking-tight mb-8">Account Settings</h1>

                <div className="max-w-2xl">
                    <form className="space-y-8">
                        {/* Profile Section */}
                        <div className="bg-zinc-900 border border-white/10 rounded-lg p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" /> Profile Information
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Full Name</label>
                                    <input type="text" defaultValue="Demo User" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input type="email" defaultValue="user@example.com" disabled className="w-full bg-black/50 border border-white/10 rounded pl-10 pr-4 py-3 text-gray-400 cursor-not-allowed" />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">Email cannot be changed.</p>
                                </div>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="bg-zinc-900 border border-white/10 rounded-lg p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-primary" /> Security
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">New Password</label>
                                        <input type="password" placeholder="New password" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Confirm Password</label>
                                        <input type="password" placeholder="Confirm new password" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="bg-primary text-black font-bold uppercase px-8 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                                <Save className="w-5 h-5" /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
