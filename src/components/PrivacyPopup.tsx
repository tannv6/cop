import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPolicy } from "../api/admin.ts";


interface PrivacyPopupProps {
    onClose: () => void;
    type?: "privacy" | "consent"; // 기본은 privacy
}

const PrivacyPopup: React.FC<PrivacyPopupProps> = ({ onClose, type = "privacy" }) => {
    const { i18n } = useTranslation();
    const [htmlContent, setHtmlContent] = useState("");

    const isEnglish = i18n.language === "en";
    const isEnglishPrivacy = type === "privacy" && isEnglish;

    // 영어이고 Privacy인 경우 하드코딩, 아니면 API 요청
    useEffect(() => {
        if (isEnglishPrivacy) {
            setHtmlContent(englishPrivacyHtml);
            return;
        }

        getPolicy(type)
            .then((res) => {
                const decoded = decodeHTML(res.content || "");
                setHtmlContent(decoded);
            })
            .catch(() => {
                setHtmlContent("<p>정책을 불러오지 못했습니다.</p>");
            });
    }, [type, isEnglishPrivacy]);

    const decodeHTML = (html: string): string => {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = html;
        return textarea.value;
    };

    return (
        <div className="popup_wrap agree_pop">
            <div className="popup">
                <div className="top">
                    <p>
                        {type === "consent"
                            ? isEnglish
                                ? "Consent to Collection and Use of Personal Information"
                                : "개인정보 수집·이용동의"
                            : isEnglish
                                ? "Privacy Policy"
                                : "개인정보 처리방침"}
                    </p>
                    <button type="button" className="close" onClick={onClose}>
                        <img src="/images/ico_closed.png" alt="닫기 아이콘" />
                    </button>
                </div>
                <div className="content">
                    <div className="padding">
                        <div
                            className="popup_html"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    </div>
                </div>
            </div>
            <div className="bg" onClick={onClose}></div>
        </div>
    );
};

export default PrivacyPopup;

export const englishPrivacyHtml = `
             <div class="detail_info">
                    <div class="tab_content">
                        <div>
                            <p>Effective Date: July 1, 2025</p>
                            <p>LG CNS Co., Ltd. (hereinafter referred to as the "Company") establishes this Privacy
                                Policy in accordance with the Personal Information Protection Act and other related laws
                                to protect users' personal information and handle related grievances promptly and
                                smoothly.</p>
                            <p>This Privacy Policy is established as follows.</p>
                        </div>

                        <div>
                            <h2>Article 1 (Collection, Use, and Retention of Personal Information)</h2>
                        </div>

                        <div>
                            <p>
                                The Company collects the following personal information with the user's consent. The
                                collected personal information will not be used for purposes other than those specified
                                below, and if the purpose of use is changed, the Company will take necessary measures
                                such as obtaining separate consent in accordance with the Personal Information
                                Protection Act.
                            </p>
                        </div>
                        <div>
                            <p>Category</p>
                            <p>Purpose of Collection and Use</p>
                            <p>Collected Items</p>
                            <p>Retention and Use Period</p>
                            <p>Membership Management</p>
                            <p>User identification, providing member-only services, service notifications, misuse
                                detection and management</p>
                            <p>[Corporate Members]</p>
                            <p>- Business information (Business registration number, business type, company name,
                                representative name, company type, business category, industry, business address,
                                business license, account number)</p>
                            <p>- Tax invoice information (Email for tax invoice, person in charge name, contact info)
                            </p>
                        </div>
                        <div>
                            <p>[Individual Members]</p>
                            <p>Name, department, position, email, mobile number</p>
                            <p>- Deleted immediately upon membership withdrawal</p>
                            <p>- However, information for preventing misuse is retained for 6 months after withdrawal
                            </p>
                            <p>Service Use</p>
                            <p>Statistics and analysis of service usage, service improvement, development of new
                                services</p>
                            <p>All collected personal information items, records generated during service use (IP
                                address, browser information, access logs, device info, cookies, text prompts, service
                                usage logs, generated and edited image results [if saved])</p>
                            <p>- Deleted immediately upon membership withdrawal</p>
                            <p>- However, login records are kept for 3 months (Communications Privacy Protection Act)
                            </p>
                            <p>Identity Verification and Misuse Prevention</p>
                            <p>Name, duplicate subscription confirmation information (DI), encrypted unique
                                identification information (CI), mobile number and carrier (for mobile authentication)
                            </p>
                            <p>- Deleted immediately upon membership withdrawal</p>
                            <p>- However, information for preventing misuse is retained for 6 months after withdrawal
                            </p>
                        </div>
                        <div>
                            <p>Customer Service</p>
                            <p>Handling service-related inquiries</p>
                            <p>Name, phone number, email address</p>
                            <p>Retained for 3 years in accordance with the Act on Consumer Protection in Electronic
                                Commerce</p>
                        </div>

                        <div>
                            <p>The Company collects the above personal information through user input on the website or
                                via automatic collection tools (cookies, log analysis tools, etc.).</p>
                        </div>
                        <div>
                            <h2>Article 2 (Provision of Personal Information to Third Parties)</h2>
                        </div>
                        <div>
                            <p>The Company uses personal information within the scope stated in the purpose of
                                collection and use and does not provide it to third parties without the user's prior
                                consent. However, personal information may be provided in accordance with legal
                                requirements through appropriate procedures.</p>
                        </div>
                        <div>
                            <h2>Article 3 (Procedures and Methods of Destroying Personal Information)</h2>
                        </div>
                        <div>
                            <p>(1) The Company destroys personal information without delay when the retention period
                                expires, the purpose of processing is achieved, or the contract is terminated under the
                                terms of service.</p>
                            <p>(2) If personal information must be retained according to other laws, even after the
                                consented retention period has passed or the purpose has been achieved, the Company will
                                store it separately in a different database or location. Cases where retention is
                                required by law include:</p>
                        </div>

                        <div>
                            <p>Law</p>
                            <p>Purpose of Collection and Use</p>
                            <p>Collected Items</p>
                            <p>Retention Period</p>
                            <p>Communications Privacy Protection Act</p>
                            <p>Provision of communication confirmation data</p>
                            <p>Log records, access location information</p>
                            <p>3 months</p>
                            <p>Act on Consumer Protection in Electronic Commerce</p>
                            <p>Records on display/advertisement</p>
                            <p>Display/advertisement records</p>
                            <p>6 months</p>
                            <p>Records on consumer complaints or dispute resolution</p>
                            <p>Consumer ID info, dispute handling records</p>
                            <p>3 years</p>
                            <p>Electronic Financial Transactions Act</p>
                            <p>Transaction verification and error correction</p>
                            <p>Records of electronic financial transactions</p>
                            <p>5 years</p>
                        </div>

                        <div>
                            <p>(3) The Company will notify the user in advance and either destroy or separately store
                                personal information of users who have not used the service for one year. Notification
                                will be given at least 30 days before the processing date through announcements, email,
                                or SMS.</p>
                            <p>(4) Destruction procedure and method:</p>
                            <p>Procedure: Personal information subject to destruction is approved by the data protection
                                officer before being destroyed.</p>
                            <p>Method: Personal information in electronic form is destroyed using technical or physical
                                methods that make recovery impossible. Paper records are shredded or incinerated.</p>
                        </div>

                        <div>
                            <h2>Article 4 (Installation, Operation and Refusal of Automatic Data Collection Tools)</h2>
                        </div>
                        <div>
                            <p>(1) The Company uses cookies to provide customized services. Cookies are small data files
                                sent to the user's browser by the server and stored on the user's hard disk.</p>
                            <p>(2) Users can refuse cookie storage through browser settings (Tools > Internet Options >
                                Privacy settings). Refusing cookies may limit use of customized services.</p>
                            <p>(3) Other information such as IP address, visit history, service usage records, and
                                browser info may be automatically collected during service use or business processes.
                            </p>
                        </div>

                        <div>
                            <h2>Article 5 (Rights of Users and Legal Representatives and How to Exercise Them)</h2>
                        </div>
                        <div>
                            <p>(1) Users can directly view, edit, or delete their personal information. The Company
                                provides such functions. Requests for viewing/editing/deleting info: [My Page > Personal
                                Info Management] or Customer Center. Requests for suspension: Customer Center.</p>
                            <p>(2) Users or their legal representatives may request to view, edit, or delete personal
                                information. The Company verifies identity before proceeding.</p>
                            <p>(3) If a user requests correction of an error in personal information, it will not be
                                used or provided until correction is complete. If the incorrect info was already shared
                                with third parties, the Company will notify them of the correction promptly.</p>
                            <p>(4) Users must keep their personal information up to date. The Company is not responsible
                                for problems caused by inaccurate info.</p>
                            <p>(5) If a user signs up using another person's personal information, their membership may
                                be terminated and legal action may follow.</p>
                            <p>(6) Users are responsible for maintaining the confidentiality of their email and
                                password, and may not transfer or lend them to others.</p>
                        </div>

                        <div>
                            <h2>Article 6 (Technical and Administrative Measures for Personal Information Protection)
                            </h2>
                        </div>
                        <div>
                            <p>The Company implements the following technical and administrative measures to prevent
                                loss, theft, leakage, alteration, or damage of personal information.</p>
                            <p>(1) Password Encryption: User passwords are stored and managed using one-way encryption,
                                and can only be checked or changed by the user who knows the password.</p>
                            <p>(2) Measures Against Hacking: The Company does its best to prevent leakage or damage of
                                personal information from hacking or viruses. Firewall systems and encryption are used
                                to protect sensitive data.</p>
                            <p>(3) Minimization and Education: Access to personal data is limited to necessary
                                personnel, and training is provided to ensure compliance with laws and internal
                                policies.</p>
                            <p>(4) Privacy Policy Management: The Company checks compliance with this policy and
                                resolves issues promptly when detected.</p>
                        </div>

                        <div>
                            <h2>Article 7 (Data Protection Officer)</h2>
                        </div>
                        <div>
                            <p>The Company appoints the following officer and department to oversee personal data
                                processing and handle complaints and remedy issues:</p>
                        </div>
                        <div>
                            <p>Data Protection Officer</p>
                            <p>Eunhye Jo</p>
                            <p>Position</p>
                            <p>Officer</p>
                            <p>Contact</p>
                            <p>chloe@lgcns.com</p>
                        </div>

                        <div>
                            <h2>Article 8 (Report and Consultation on Personal Data Breaches)</h2>
                        </div>
                        <div>
                            <p>Users may contact the following institutions for remedy or consultation in the event of a
                                privacy breach. These are government-affiliated agencies and may be contacted if
                                internal complaint resolution is unsatisfactory.</p>
                        </div>
                        <div>
                            <p>Personal Information Infringement Report Center</p>
                            <p>Website: https://privacy.kisa.or.kr</p>
                            <p>Phone: 118</p>
                            <p>Personal Information Dispute Mediation Committee</p>
                            <p>Website: https://www.kopico.go.kr</p>
                            <p>Phone: 1833-6972</p>
                            <p>Supreme Prosecutors’ Office Cybercrime Division</p>
                            <p>Website: https://www.spo.go.kr</p>
                            <p>Phone: 1301</p>
                            <p>Korean National Police Agency Cyber Bureau</p>
                            <p>Website: https://cyberbureau.police.go.kr</p>
                            <p>Phone: 182</p>
                        </div>

                        <div>
                            <h2>Article 9 (Duty to Notify Changes)</h2>
                        </div>
                        <div>
                            <p>(1) This Privacy Policy may be changed due to legal amendments, government policies, or
                                internal regulations. Any changes will be notified at least 7 days before the effective
                                date via the website. If changes significantly affect user rights, they will be notified
                                at least 30 days in advance.</p>
                            <p>(2) If users do not agree to the revised policy, they may withdraw their consent.
                                However, service availability may be restricted.</p>
                            <p>(3) If no explicit objection is raised by the effective date, it will be deemed that the
                                user has agreed to the changes.</p>
                        </div>

                        <div>
                            <p>Appendix</p>
                            <p>Notice Date: July 1, 2025</p>
                            <p>Effective Date: July 1, 2025</p>
                        </div>
                    </div>

`