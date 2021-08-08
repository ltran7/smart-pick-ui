import React from 'react';
import { useTranslation } from 'react-i18next';

function About(props) {
    const { t } = useTranslation();
    return (
        <div className="container">
            <div className="row">
                <span className="fa fa-info fa-2x float-left ml-2 mr-2"/><h3>{t("about_us")}</h3>
                <div className="col-12">   
                    <hr/>
                </div>
            </div>                
            <div className="row row-content">
                <div className="col-12">
                    <p>Lorem ipsum dolor sit amet, posse recteque convenire sed in. Brute altera feugiat sea no. Te feugait postulant ius, saperet blandit an ius. Enim alienum quaerendum in vix, ad minim inermis corrumpit mel.</p>
                    <p>Ludus percipitur temporibus mei ne. In libris semper pro. An nam novum putant antiopam, et vide solum percipit vim. Suas choro inciderint et eum. No duo affert conceptam, habeo eirmod vivendo sea et.</p>
                    <p>Idque delicata et nec, ad malis interesset est. Sea te tibique pertinax prodesset. Ne cum adhuc tibique verterem, in alterum albucius repudiare his. Ex quas omnesque cum, sea eirmod inciderint ut.</p>
                    <p>Est te noster aliquam, mel utroque interpretaris an, iisque civibus cum et. At libris quaeque nec, ex elit adipisci suscipiantur cum. Tale alterum efficiendi te has, putant epicurei vix ad, pro ne saepe copiosae. Mea nibh vocibus vituperatoribus ad, his eu prompta graecis nusquam.</p>
                    <p>Agam laboramus ea vel, id cetero convenire qui, ius ei graece assueverit. Nam ad adhuc option. Id eum vero accusamus necessitatibus, velit dolor apeirian eos in. Eam convenire periculis evertitur ea. Dico oportere ut per, an prima tantas sed. Ne sea iudico ornatus corrumpit.</p>
                </div>
            </div>
        </div>
    )
}

export default About;