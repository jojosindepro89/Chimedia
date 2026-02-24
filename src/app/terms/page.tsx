import React from 'react';

export const metadata = {
    title: 'Terms of Service | Chigoziemedia House',
    description: 'Terms of Service for Chigoziemedia House.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white">Terms of Service</h1>

                <div className="bg-zinc-900 border border-zinc-800 rounded-lg text-gray-300">
                    <div className="p-8 space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the Chigoziemedia House website and Chigoziemedia House services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these specific services, you shall be subject to any posted guidelines or rules applicable to such services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">2. Services Description</h2>
                            <p>
                                Chigoziemedia House provides sports news, analysis, and premium betting predictions. Chigoziemedia House offers an online marketplace for various consumer goods. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">3. User Accounts</h2>
                            <p>
                                To access certain features of the website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information during registration.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">4. Purchases and Payments</h2>
                            <p>
                                All purchases made on Chigoziemedia House and subscriptions for Chigoziemedia House premium content are processed securely through Paystack. Prices are subject to change without notice. We are not responsible for any errors in pricing or product descriptions, though we strive for accuracy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">5. Betting Predictions Disclaimer</h2>
                            <p className="text-yellow-500/90 font-medium">
                                Please Note: Our sports predictions and tips are for informational and entertainment purposes only.
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>We do not guarantee the accuracy of any prediction.</li>
                                <li>Past performance is not indicative of future results.</li>
                                <li>Betting involves financial risk. You should only bet what you can afford to lose.</li>
                                <li>We are not responsible for any financial losses incurred from following our tips.</li>
                                <li>Gambling is for users 18+ only. Please gamble responsibly.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">6. Refunds and Returns Policy</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Digital Goods (Subscriptions):</strong> Due to the nature of digital content, subscriptions for premium predictions are generally non-refundable once accessed.</li>
                                <li><strong>Physical Goods (Chigoziemedia House):</strong> Returns are accepted for defective or damaged items within 7 days of delivery, provided they are in their original packaging. Please contact support to initiate a return.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">7. Intellectual Property</h2>
                            <p>
                                All content on this site, including text, graphics, logos, and software, is the property of Chigoziemedia House and protected by international copyright laws. You may not reproduce, distribute, or create derivative works from this content without express written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
                            <p>
                                In no event shall Chigoziemedia House or its owners be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including but not limited to damages for loss of profits, data, or other intangibles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">9. Governing Law</h2>
                            <p>
                                These Terms of Service are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Nigeria.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">10. Contact Information</h2>
                            <p>
                                For any questions regarding these Terms of Service, please contact us at: <br />
                                <a href="mailto:support@chigoziemediahouse.com" className="text-primary hover:underline">support@chigoziemediahouse.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
