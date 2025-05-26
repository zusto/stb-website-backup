
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you might want a back link or similar
import { ArrowLeft } from 'lucide-react';

const TermsAndConditionsPage = () => {
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
          Terms and Conditions
        </h1>
        
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700 space-y-4">
          <p className="font-semibold">Application for membership – Registration sheet</p>
          <p>of CKM Association for Students, Youth and Teachers, registered in the Register of Civic Associations, having its registered office at Vysoká 32, 811 06 Bratislava, Organization ID no.: 31768164 (hereinafter referred to as the "CKM SYTS" or "Association")</p>
          <p>I hereby ask to be accepted as a member of CKM SYTS and for issue/renewal of a membership card.</p>

          <h2 className="text-xl font-semibold text-sunny-orange-dark mt-6">Excerpt from the Terms and Conditions of Membership of the CKM Association for Students, Youth and Teachers (hereinafter referred to as the "CKM SYTS") for natural persons.</h2>
          <p>The full wording of the Terms and Conditions of Membership of CKM SYTS for all members is included in the Association's statutes, which are published at <a href="http://ckmsyts.sk/dokumenty/stanovy_zdruzenia_CKM_SYTS.pdf" target="_blank" rel="noopener noreferrer" className="text-sunny-orange hover:underline">http://ckmsyts.sk/dokumenty/stanovy_zdruzenia_CKM_SYTS.pdf</a>.</p>

          <h3 className="text-lg font-semibold mt-4">MEMBERSHIP OF THE ASSOCIATION</h3>
          <p><strong>1.1/</strong> CKM SYTS is a voluntary association and no member thereof shall be restricted on his/her rights. This principle is considered to be the core principle of CKM SYTS's activity.</p>

          <h3 className="text-lg font-semibold mt-4">ESTABLISHMENT OF THE MEMBERSHIP</h3>
          <p><strong>2.1/</strong> Members of the Association may be as follows:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Natural persons – Students of full-time study</li>
            <li>Natural persons – Teachers</li>
            <li>Legal entities</li>
          </ul>
          <p><strong>2.1.1/</strong> A natural person shall become a member of the Association upon filling in the membership application - the Registration sheet and payment of the first membership fee for natural persons, proving his/her membership using member card.</p>
          <p><strong>2.1.2/</strong> In case of failure to pay the membership fee for the relevant period specified by the Board of Directors according to paragraph 3.3. of present Statutes by a member of the Association, such member shall remain a member of the Association but his/her membership rights shall be limited and s/he shall have only the rights similar to the Associate Member and s/he shall temporarily lose the right to prove his/her membership using his/her membership card. Upon due payment of the membership fee, the member's membership rights shall be restored to the original standard. The extent of the rights of a member of CKM SYTS shall therefore be dependent on the payment of membership fee for the period in question.</p>

          <h3 className="text-lg font-semibold mt-4">MEMBERSHIP CARDS</h3>
          <p><strong>3.1/</strong> CKM SYTS issues and distributes following membership cards:</p>
          <ul className="list-disc list-inside ml-4">
            <li>a) ISIC card (International Student Identity Card), for students of full-time study meeting the conditions listed on the page <a href="https://isic.sk/narok-na-preukaz-isic/" target="_blank" rel="noopener noreferrer" className="text-sunny-orange hover:underline">https://isic.sk/narok-na-preukaz-isic/</a>,</li>
            <li>b) ITIC card (International Teacher Identity Card), for pedagogical or professional staff meeting the conditions listed on the page <a href="https://itic.sk/narok-na-preukaz-itic/" target="_blank" rel="noopener noreferrer" className="text-sunny-orange hover:underline">https://itic.sk/narok-na-preukaz-itic/</a>,</li>
            <li>c) EYCA/EURO&lt;26 youth card for young people meeting the conditions listed at <a href="https://euro26.sk/narok-na-kartu-euro/" target="_blank" rel="noopener noreferrer" className="text-sunny-orange hover:underline">https://euro26.sk/narok-na-kartu-euro/</a>.</li>
          </ul>
          <p><strong>3.2/</strong> The name of the member of the Association - the holder of the card and the period of validity of the card, shall be listed thereon among other items.</p>

          <h3 className="text-lg font-semibold mt-4">RIGHTS AND OBLIGATIONS OF MEMBERS</h3>
          <p><strong>4.1/</strong> A member of the Association referred to in paragraph 2.1 shall be entitled to use all the benefits and discounts resulting from membership of the Association notified to him/her or listed in the Information Guide/Association website after having submitted his/her membership card, in particular s/he shall have the right to:</p>
          <ul className="list-disc list-inside ml-4">
            <li>a) enjoy discounts and benefits in transport, accommodation, travel and culture,</li>
            <li>b) participate in the organized meetings and other activities of CKM SYTS,</li>
            <li>c) regularly receive information regarding the extent and possibilities of discounts and benefits resulting from membership of CKM SYTS at home and abroad.</li>
          </ul>
          <p><strong>4.2/</strong> A member of the Association referred to in paragraph 2.1 is obliged to submit a valid membership card when enjoying particular benefits and discounts, and upon request of the provider of a discount, s/he is also obliged to submit another personal identification card.</p>
          <p><strong>4.3/</strong> Pursuant to the Statutes a member of the Association shall receive information about the possibilities of enjoying benefits resulting from association membership (use of membership cards) to an e-mail or postal address specified by such member. Upon establishment of a membership, a member of the Association, in accordance with the previous provisions, acknowledges that it is his right as a member of the association to be regularly informed and the obligation of CKM SYTS to regularly inform its members in accordance with the statutes of the association about offers to use membership in the association, which will send CKM SYTS to its members. A member of the association is allowed to inform CKM SYTS that he does not wish to receive the said notifications from CKM SYTS, in which case the non-sending of offers for membership is not considered a breach of CKM SYTS's obligations under the approved articles of association. For the purposes of this provision, a natural person shall also be considered to be a member of the Association at the time after signing the application until the payment of the first member fee.</p>

          <h3 className="text-lg font-semibold mt-4">TERMINATION OF MEMBERSHIP</h3>
          <p><strong>5.1/</strong> Membership in the Association shall terminate: in the manner specified in the statutes of the Association - Point 3.8 /</p>

          <h3 className="text-lg font-semibold mt-4">AFFIDAVITS</h3>
          <p><strong>6.1/</strong> Upon signing this Application for membership – Registration sheet I hereby declare that I have full legal capacity in accordance with the provisions of Section 8 and Section 9 of the Civil Code.</p>
          <p><strong>6.2/</strong> Upon signing this Application for membership – Registration sheet I voluntarily, freely and solemnly apply for being a member of the CKM SYTS Association and I fully agree with the current amount of the membership fee with which I was duly acquainted before signing this Application – Registration sheet, as well as with the terms and conditions of membership of the CKM SYTS Association, with which I have become fully acquainted and at the same time I undertake to regularly update all my data listed in this Application for membership – Registration fee. I acknowledge that the membership card is not transferable and that the benefits of the card only apply to the eligible member of the Association. I acknowledge that I will be sent membership-related information and about the scope and possibilities of using the benefits resulting from association membership and use of the membership card to the e-mail address, postal address, mobile phone number (SMS, phone call) which I have specified for such purpose. Sending under the previous sentence may also be performed by automatic electronic mail.</p>
          <p><strong>6.3/</strong> I also declare that all the personal data I have provided in this Application – Registration sheet are true and have been provided voluntarily and freely.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;

