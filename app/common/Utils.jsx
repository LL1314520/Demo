import React from 'react';
import ReactDOM from 'react-dom';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import ImgLightbox from "./ImgLightbox";
import {NameCard} from "../component/Comps";

let Utils = (function () {

    let _setCurrentPage = (key, pageno) => {
        sessionStorage.setItem(key, pageno);
    };

    let _getCurrentPage = (key) => {
        return sessionStorage.getItem(key) ? parseInt(sessionStorage.getItem(key)) : 1
    };

    let common = (() => {

        let renderReactDOM = (child, options = {}) => {

            let div = document.createElement('div');
            let {id} = options;
            if (id) {
                let e = document.getElementById(id);
                if (e) {
                    document.body.removeChild(e);
                }
                div.setAttribute('id', id);
            } else {

            }

            document.body.appendChild(div);
            ReactDOM.render(<LocaleProvider locale={zhCN}>{child}</LocaleProvider>, div);
        };

        let closeModalContainer = (id_div) => {
            let e = document.getElementById(id_div);
            if (e) {
                document.body.removeChild(e);
            }
        };

        let createModalContainer = (id_div) => {
            //强制清理同名div，render会重复创建modal
            closeModalContainer(id_div);
            let div = document.createElement('div');
            div.setAttribute('id', id_div);
            document.body.appendChild(div);
            return div;
        };

        let scrollTop = function () {

            let x = document.body.scrollTop || document.documentElement.scrollTop;
            let timer = setInterval(function () {
                x = x - 100;
                if (x < 100) {
                    x = 0;
                    window.scrollTo(x, x);
                    clearInterval(timer);
                }
                window.scrollTo(x, x);
            }, 20);
        };

        let showImgLightbox = (images, index) => {
            common.renderReactDOM(<ImgLightbox images={images} index={index} show={true}/>);
        };

        return {
            renderReactDOM, closeModalContainer, createModalContainer, scrollTop, showImgLightbox
        }
    })();

    let pager = (() => {

        let convert2Pagination = (result) => {

            let {pageable = {}, totalElements, totalPages} = result;

            let pageSize = pageable.pageSize || CTYPE.pagination.pageSize;
            let current = pageable.pageNumber + 1;

            return {
                current,
                total: totalElements, totalPages,
                pageSize
            }
        };

        return {convert2Pagination}

    })();

    let namecard = (() => {
        let show = (options) => {
            common.renderReactDOM(<NameCard card={namecard} options={options}/>, {id: 'div-namecard'});
        };

        return {show}

    })();

    return {
        common, pager, namecard
    };

})();

export default Utils;
