let CTYPE = (() => {

    return {

        addr_cn: '河南郑州市新郑市龙湖镇华南城电商大厦B座303',
        worktime: '周一至周五 9:30-18:00',
        contact: '郭老师150-2112-9897   岳老师 185-3941-2882',

        pagination: {pageSize: 10},
        commonPagination: {showQuickJumper: true, showSizeChanger: true, showTotal: total => `总共 ${total} 条`},

        bannerTypes: {HOME: 1, JAVA_PRY: 3, JAVA_ADV: 5, SERVICE: 7, REACT_PC: 9, ABOUT_PC: 11},

        dialogItemLayout: {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        },

    }

})();

export default CTYPE;