import React from 'react';

export const metadata = {
    title: 'Privacy Policy | Chigoziemedia House',
    description: 'Privacy Policy for Chigoziemedia House.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white">Privacy Policy</h1>

                <div className="bg-zinc-900 border border-zinc-800 rounded-lg text-gray-300">
                    <div className="p-8 space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
                            <p>
                                Welcome to Chigoziemedia House ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, and protect your data when you visit our website, use our services, or purchase products from Chigoziemedia House.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
                            <p className="mb-2">We may collect the following types of information:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Personal Information:</strong> Name, email address, phone number, and shipping address when you register or place an order.</li>
                                <li><strong>Payment Information:</strong> We do not store your credit card details. All payments are processed securely via Paystack.</li>
                                <li><strong>Usage Data:</strong> Information about how you use our website, including your IP address, browser type, and pages visited.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
                            <p className="mb-2">We use your data to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Process and deliver your orders from Chigoziemedia House.</li>
                                <li>Manage your account and subscription to our premium sports predictions.</li>
                                <li>Communicate with you regarding updates, offers, and customer support.</li>
                                <li>Improve our website functionality and user experience.</li>
                                <li>Comply with legal obligations.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">4. Data Sharing and Disclosure</h2>
                            <p>
                                We do not sell your personal data to third parties. We may share your information with trusted third-party service providers (such as payment processors like Paystack and delivery logistics partners) solely for the purpose of fulfilling our services to you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">5. Cookies</h2>
                            <p>
                                Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can choose to disable cookies through your browser settings, though this may affect some site functionality.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
                            <p>
                                We implement strict security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
                            <p>
                                You have the right to access, correct, or delete your personal information held by us. If you wish to exercise these rights, please contact our support team.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at: <br />
                                <a href="mailto:support@chigoziemediahouse.com" className="text-primary hover:underline">support@chigoziemediahouse.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
