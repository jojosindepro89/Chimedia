import { ArrowLeft, RefreshCw, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Return & Refund Policy | Chigozie Media House",
    description: "Our policy regarding returns, refunds, and cancellations for memberships and shop items."
};

export default function ReturnPolicyPage() {
    return (
        <div className="bg-black min-h-screen pb-20">
            {/* Header */}
            <div className="bg-zinc-900 border-b border-white/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary font-bold uppercase text-xs mb-4 border border-primary/50">
                        Customer Support
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white mb-6">
                        Return & <span className="text-primary">Refund Policy</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        We value your satisfaction. Please read our policy regarding returns and refunds carefully.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 max-w-4xl">
                <div className="grid gap-8">
                    {/* Digital Products Section */}
                    <div className="bg-zinc-900 border border-white/10 rounded-lg p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-primary/20 p-3 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white uppercase mb-2">Digital Products & Memberships</h2>
                                <p className="text-gray-400">
                                    Includes: Premium Articles, Betting Predictions, VIP Memberships.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-300">
                            <p>
                                Due to the nature of digital content and immediate access to premium information, <strong>all sales of digital products and memberships are final and non-refundable</strong>.
                            </p>
                            <p>
                                Unlike physical goods, digital access cannot be "returned" once granted. However, you can cancel your subscription renewal at any time from your dashboard to prevent future charges.
                            </p>
                            <div className="bg-black/30 p-4 rounded border-l-4 border-yellow-500 mt-4">
                                <p className="text-sm">
                                    <span className="text-white font-bold">Exception:</span> If you experience technical issues preventing you from accessing the content you paid for, please contact support within 48 hours for a resolution or potential refund.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Physical Goods Section */}
                    <div className="bg-zinc-900 border border-white/10 rounded-lg p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-green-500/20 p-3 rounded-full">
                                <RefreshCw className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white uppercase mb-2">Physical Goods (Shop)</h2>
                                <p className="text-gray-400">
                                    Includes: Jerseys, Merchandise, Accessories.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-300">
                            <p>
                                We accept returns for physical items within <strong>30 days</strong> of delivery, provided the item is:
                            </p>
                            <ul className="space-y-2 ml-6 list-none">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" /> Unworn and unwashed
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" /> In original packaging with tags attached
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" /> Directed by our support team
                                </li>
                            </ul>
                            <p className="mt-4">
                                <strong>Damaged Items:</strong> If you receive a defective or damaged item, please contact us immediately with photos. We will arrange a free replacement or full refund.
                            </p>
                            <p>
                                <strong>Return Shipping:</strong> Customers are responsible for return shipping costs unless the return is due to our error (e.g., wrong item sent).
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-zinc-900 border border-white/10 rounded-lg p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-500/20 p-3 rounded-full">
                                <HelpCircle className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white uppercase mb-2">How to Request a Return</h2>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-300">
                            <p>To initiate a return or refund request, please follow these steps:</p>
                            <ol className="list-decimal ml-6 space-y-2">
                                <li>Email our support team at <a href="mailto:support@chigoziemedia.com" className="text-primary hover:underline">support@chigoziemedia.com</a>.</li>
                                <li>Include your <strong>Order ID</strong> and the reason for the return.</li>
                                <li>For physical items, please attach photos if there is damage.</li>
                            </ol>
                            <p className="mt-4">
                                We typically respond within 24-48 business hours.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
