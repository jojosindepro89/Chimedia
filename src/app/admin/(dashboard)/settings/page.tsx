import { Save } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white uppercase mb-8">Site Settings</h1>

            <div className="bg-zinc-900 border border-white/10 rounded-sm p-8 max-w-2xl">
                <form className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Site Title</label>
                        <input type="text" defaultValue="Chigozie Media House" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Contact Email</label>
                        <input type="email" defaultValue="support@chigoziemedia.com" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <h3 className="text-white font-bold mb-4 uppercase text-sm">Maintenance</h3>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-black text-primary focus:ring-primary" />
                            <span className="text-gray-300">Enable Maintenance Mode</span>
                        </label>
                    </div>

                    <button className="bg-primary text-black font-bold uppercase px-8 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
