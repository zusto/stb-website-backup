
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-2xl border-2 border-amber-400">
        <Link to="/checkout/details" className="inline-flex items-center text-sunny-orange hover:text-sunny-orange-dark mb-6 group">
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Details
        </Link>
        <h1 className="text-3xl font-display text-sunny-orange-dark mb-6 text-center">
          Privacy Policy
        </h1>

        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-sunny-orange-dark mt-6">NOTICE ON THE PROCESSING OF PERSONAL DATA</h2>
          <p>UNDER Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (hereinafter referred to as the "GDPR")</p>

          <p><strong>1.</strong> A member of the Association as the data subject pursuant to the GDPR is informed that:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>s/he shall have the right, not obligation to provide his/her personal data to CKM SYTS association as the operator of his/her personal data (however, the provision of personal data specified in the header of this record sheet is necessary for the conclusion of a contract with the Data Controller - membership in the CKM SYTS association),</li>
            <li>the identification data and contact details of the data controller are listed in the heading of present application,</li>
            <li>the purpose of the processing of personal data is the contractual fulfilment of the obligation of the CKM SYTS civic association specified in the Statutes and this Application to its members, (acceptance as a member of the association and fulfillment of other obligations arising from the Articles of Association), namely: fulfillment of obligations and acceptance of rights arising from membership in the association by CKM SYTS, identification of members of CKM SYTS and users of benefits associated with membership in CKM SYTS, sending information related with membership and on the possibilities and scope of using the membership card in accordance with the Articles of Association and for purposes related to the activities of CKM SYTS under its Articles and for the purposes of statistics, documentation and records. For the purpose of registration, a natural person is also considered a member of the association in the time after signing the application until the payment of the first membership fee,</li>
            <li>the following categories of personal data will be processed for the above purposes: name, surname, title, date of birth, residence (permanent residence, temporary residence), email address, telephone number, school, year, serial serial number of the card chip, unique identification number the license and the date of the beginning and end of the validity of the license,</li>
            <li>the above personal data will be processed for the duration of the data subject's full membership in the CKM SYTS association and 5 years after the expiry of the data subject's last membership card,</li>
            <li>CKM SYTS as an operator may carry out in accordance with the provisions of Art. 44 and subsequent provisions of the GDPR Regulation transfer of personal data of data subjects in the range of: name, surname, date of birth, school, unique card identification number and card start and end date within the Member States of the European Union as well as Member States to third countries which, according to a decision of the European Commission, guarantee an adequate level of personal data protection, to the extent necessary to achieve the above-mentioned purpose of processing CKM SYTS personal data (membership in CKM SYTS and providing benefits from it abroad), namely until Denmark and Belgium, the International Student Identity Card Association, Nygade 3 1., DK-1164, Copenhagen, Denmark and the European Youth Card Association Rue D'Alost 7-11, 1000 Brussels, Belgium,</li>
            <li>personal data processed to the extent: name, surname, school, client number, serial serial number of the license chip, unique identification number of the license and the start and end date of the license may be legitimately made available by CKM SYTS and provided to another legal entity or natural person ( ie a circle of all providers of discounts and other benefits who have a special contract with CKM SYTS for these purposes) on the basis of sending an electronic application (eg web service query to the database of CKM SYTS members), which will or will not further process them, in to the extent strictly necessary to achieve the processing of personal data for the above purpose (membership in the CKM SYTS association),</li>
            <li>the legal basis for the processing of personal data is the fulfilment of the obligations of CKM SYTS that are imposed on the data subject as a member of CKM SYTS (performance from the concluded contract according to Art. 6 par. 1 letter b) GDPR Regulations,),</li>
            <li>s/he shall have the right to request from the operator the access to personal data relating to him/her, i. e. whether CKM SYTS processes personal data relating to him/her, the purpose, category and time period of processing of personal data, and others.</li>
            <li>s/he shall have the right for correction of incorrect personal data relating to him/her by CKM SYTS without undue delay. With regard to the purpose of the processing of personal data, the data subject shall be entitled to supplement incomplete personal data,</li>
            <li>s/he shall have the right for erasure of personal data relating to him/her by CKM SYTS without undue delay, in particular, but not exclusively, if personal data are no longer necessary for the purpose for which they were acquired or otherwise processed, or if if other conditions for the exercise of this right under the GDPR Regulation are met,</li>
            <li>s/he shall have the right for restriction of processing of personal data by CKM SYTS, in particular, but not exclusively, if a member of the Association has objected to the accuracy of personal data during a period allowing CKM SYTS to verify the accuracy of personal data,</li>
            <li>s/he shall have the right to be informed by CKM SYTS of the correction of personal data, the erasure of personal data or the restriction of processing of personal data, unless this is shown to be impossible or it requires the undue efforts,</li>
            <li>s/he shall have the right to receive personal data relating to him/her which s/he has provided to CKM SYTS in a structured, commonly used and machine readable,</li>
            <li>s/he shall have the right to object to the processing of his/her personal data by the CKM SYTS, due to CKM SYTS's lack of legitimate interest in the processing of personal data (if personal data are processed on the basis of a legitimate interest) or the lack of a legal claim. Until such time as the aforementioned have been proved, CKM SYTS may not process personal data,</li>
            <li>s/he has the right to the transfer of personal data from the Association to another Data Controller, as far as technically possible, if the personal data are processed by automated means and executed on the basis of consent or performance of the contract,</li>
            <li>s/he shall have the right not to be affected by a decision which is based solely on the automated processing of personal data, including profiling, and which has legal effects eligible to have an impact on him/her or to have a similar significant effect on him/her,</li>
            <li>as to all requests made by the data subject and filed electronically, CKM SYTS shall provide information electronically unless the data subject requested information to be provided otherwise. In the case of a different form of the request by the data subject, the form of the CKM SYTS' response is subject to the own discretion of the data subject, however at all times in a manner enabling the delivery of the response,</li>
            <li>all requests made by the data subject shall be responded free of charge, unless otherwise stated herein, and the applicant is required to pay CKM SYTS the delivery cost (postage expenses) if the applicant requests delivery otherwise than electronically. If the request of the data subject is obviously unjustified or unreasonable, in particular due to its recurring nature, CKM SYTS may request a reasonable fee taking into account the administrative costs or refuse to act upon the application,</li>
            <li>s/he shall have the right to file a motion for action so that the Office for Personal Data Protection may establish whether the rights of natural persons have been violated in the processing of their personal data or whether generally binding regulations related to personal data protection have been infringed. The template of the proposal is published on the website of the Office for Personal Data Protection,</li>
            <li>if s/he does not have full legal capacity, his/her rights may be exercised by a statutory representative,</li>
            <li>if the data subject is deceased, his/her rights under the GDPR may be invoked by a close person.</li>
          </ul>

          <p><strong>2.</strong> A member of the Association as the data subject shall have the right, upon written request, to require from CKM SYTS (exercise of the right of access to personal data):</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>a) the purpose of the processing, the legal basis of the processing, the categories of personal data concerned; an advice of voluntariness or obligation to provide the required personal data; third party information, if foreseen or obvious that personal data will be made available to them; the form of disclosure if personal data are to be disclosed; the range of recipients, if foreseen or obvious that personal data will be made available to them; third countries, if foreseen or obvious that the transfer of personal data to such countries will be performed.</li>
            <li>b) in a generally understandable form, accurate information on the source from which it obtained his/her personal data for processing (if personal data were not obtained directly from a member of the association).</li>
          </ul>
          
          <p><strong>3.</strong> A member of the Association – the data subject may exercise the above rights:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>a) in writing, if it appears from the content of his/her application that s/he exercises his/her right,</li>
            <li>b) personally in oral way, to the record, from which it must be clear who has exercised the right to claim, what is claimed and when and who has drawn up the record, the signature of such person and the signature of the data subject; CKM SYTS hands over a copy of the record to the data subject,</li>
            <li>c) electronically to the e-mail address <a href="mailto:gdpr@ckmsyts.sk" className="text-sunny-orange hover:underline">gdpr@ckmsyts.sk</a>, which is also the contact address of the designated responsible person,</li>
            <li>d) against the processor (relevant school), who shall be obliged to hand over such request or record to the controller without undue delay.</li>
          </ul>

          <p><strong>4.</strong> Consent to the provision of personal data Declaration of a member of the association – the data subject</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>a) By signing this application, I solemnly declare that I have been duly informed before the signing hereof of the identification data of processors authorized by CKM SYTS as an operator under Art. 28 of GDPR to process the personal data, and whose identification data are published on <a href="http://ckmsyts.sk/dokumenty/sprostredkovatelia_zdruzenia_CKM_SYTS.pdf" target="_blank" rel="noopener noreferrer" className="text-sunny-orange hover:underline">http://ckmsyts.sk/dokumenty/sprostredkovatelia_zdruzenia_CKM_SYTS.pdf</a>. At the same time, I acknowledge that the list of processors may change and the updated list of all processors will be published and accessible on the above mentioned page.</li>
            <li>b) At the same time, I declare that all personal data I have provided herein are true and have been provided voluntarily and freely and that I have understood the above information on the processing of personal data carried out by CKM SYTS.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

