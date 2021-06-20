import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer(props) {
    const { t } = useTranslation();
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">   
                <div className="col-auto">
                    <p>Copyright © {(new Date().getFullYear())} {t("smart_pick")}, Inc. {t("all_rights_reserved")}</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;