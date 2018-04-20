import CommonService from '@/services/CommonService'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    id: '',
    isBarFinish: false,
    dwlist: [],
    xmdllist: [],
    selectDwdm: '',
    selectCompid: '',
    date: moment(new Date()).format('YYYY年MM月'), // 当前日期
    yearmonth: moment(new Date()).format('YYYYMM'),
    year: moment(new Date()).format('YYYY'), // 当前年
    yearmonthArr: null,
    xmdlmc: '',
    selectXmdl: '',
    chartMap: {
      categorys: [],
      data: []
    },
    chartPadding: 25,
    chartlist: [],
    xmbm: '',
    tableQueryCondition: {pzGjgltjs: [], organ_id: ''}, // 项目大类下拉，单位ID，年月
    tableQueryCondition_xmmx: {pzGjgltjs: [], organ_id: ''}, // 月度预算table: 单位ID， 日期，项目大类，项目编码
    tableQueryCondition_xmdl: {pzGjgltjs: [], organ_id: ''}, // 项目大类累计执行数table: 单位ID，当 前日期
    tableQueryCondition_xmdl02: {pzGjgltjs: [], organ_id: ''}, // 项目大类申请数table: 单位ID，日期数组
    tableQueryCondition_lxfx: {pzGjgltjs: [], organ_id: ''}, // chart：单位ID，日期，项目大类
    colMap: {
      '单位ID': 'compid',
      '日期': 'date',
      '项目大类ID': 'xmid',
      '项目大类名称': 'name'
    },
    lxfxColMap: {
      '单位名称': 'dwmc',
      '项目大类名称': 'name',
      '月份': 'month',
      '物资申请计划数': 'wzs',
      '工程申请计划数': 'gcs',
      '本月总完成率': 'wcl'
    }
  },

  getters: {
    // getid (state) {
    //   return state.id || ''
    // },
  },

  mutations: {
    setIsBarFinish (state, data) {
      state.isBarFinish = true
    },
    setTableMap (state, data) {
      state.tableMap = data
    },
    setDwlist (state, items) {
      state.dwlist = items
    },
    setXmdllist (state, items) {
      state.xmdllist = items
    },
    setChartlist (state, items) {
      state.chartlist = items
    },
    setChartMap (state, items) {
      state.chartMap = items
    },
    setSelectXmdl (state, data) {
      state.selectXmdl = data
    },
    setSelectDwdm (state, data) {
      state.selectDwdm = data
    },
    setSelectCompid (state, data) {
      state.selectCompid = data
    },
    setDate (state, data) {
      state.date = data
      state.year = data.substr(0, 4)
      state.yearmonth = data.replace('年', '').replace('月', '')
      var yearmonthArr = []
      for (var i = 1; i <= Number(state.yearmonth.substr(4)); i++) {
        if (i < 10) {
          yearmonthArr.push(state.year.replace('年', '').concat('0' + i))
        } else {
          yearmonthArr.push(state.year.replace('年', '').concat('' + i))
        }
      }
      state.yearmonth = state.yearmonth.length < 6 ? state.year + '0' + state.yearmonth.substr(4) : state.yearmonth
      state.yearmonthArr = yearmonthArr
    },
    setYearMonthArr (state, data) {
      var yearmonthArr = []
      for (var i = 1; i <= Number(state.yearmonth.substr(4)); i++) {
        if (i < 10) {
          yearmonthArr.push(state.year.replace('年', '').concat('0' + i))
        } else {
          yearmonthArr.push(state.year.replace('年', '').concat('' + i))
        }
      }
      state.yearmonthArr = yearmonthArr
    },
    setXmdlmc (state, data) {
      state.xmdlmc = data
    },
    setChartPadding (state, data) {
      state.chartPadding = 15
    },
    setTableQueryCondition_lxfx (state, data) { // 柱状图，类型分析，201704,那么查询20701-201704过滤条件：年份，项目大类，单位ID
      state.tableQueryCondition_lxfx = {}
      state.tableQueryCondition_lxfx.organ_id = state.selectCompid || '-1'
      state.tableQueryCondition_lxfx.project_class_id = state.selectXmdl
      state.tableQueryCondition_lxfx.pzGlsxs = [{
        containValues: state.yearmonthArr,
        glms: '等于' + state.yearmonthArr.join('、'),
        sxmc: 'month_id',
        sxms: '日期'
      }]
    },
    setTableQueryCondition_xmdl (state, data) { // 项目大类累计执行数table, 过滤条件 ： 当前选择年月，单位ID
      state.tableQueryCondition_xmdl = {}
      state.tableQueryCondition_xmdl02 = {}
      state.tableQueryCondition = {}
      state.tableQueryCondition_xmdl.organ_id = state.selectCompid || '-1'
      state.tableQueryCondition_xmdl.month_id = state.yearmonth

      state.tableQueryCondition_xmdl02.organ_id = state.selectCompid || '-1'
      state.tableQueryCondition_xmdl02.pzGlsxs = [{
        containValues: state.yearmonthArr,
        glms: '等于' + state.yearmonthArr.join('、'),
        sxmc: 'month_id',
        sxms: '日期'
      }]
      // 项目大类下拉框过滤条件
      state.tableQueryCondition.organ_id = state.selectCompid || '-1'
      state.tableQueryCondition.month_id = state.yearmonth || state.year + '01'
    },
    setTableQueryCondition_xmmx (state, data) { // 月度预算数明细table，201704,那么查询20701-201704 过滤条件：年月，单位ID，项目大类名称， 项目编码
      state.tableQueryCondition_xmmx = {}
      state.tableQueryCondition_xmmx.organ_id = state.selectCompid || '-1'
      state.tableQueryCondition_xmmx.project_class_name = state.xmdlmc
      state.tableQueryCondition_xmmx.pzGlsxs = [{
        containValues: state.yearmonthArr,
        glms: '等于' + state.yearmonthArr.join('、'),
        sxmc: 'month_id',
        sxms: '日期'
      }]
      if (data) {
        state.tableQueryCondition_xmmx.pzGjgltjs = [{
          glms: '包含' + data.xmbm,
          qyh: '0',
          sxlx: 1,
          sxmc: 'project_id',
          sxms: '项目编码',
          tj1: '1',
          tj2: '',
          xh: 3,
          z1: data.xmbm,
          z2: ''
        }]
      }
    }
  },
  actions: {
    // 顶部过滤框
    loadBar ({commit, state}, data) {
      let loginContext = this._modules.root.state.loginContext
      commit('setIsBarFinish', true)
      commit('setYearMonthArr')
      if (loginContext) {
        var result = [{
          dwdm: loginContext.loginDwdm,
          compid: loginContext.loginOrgId,
          dwmc: loginContext.loginOrgName
        }]
        commit('setDwlist', result)
        commit('setSelectCompid', result[0]['compid'])
        commit('setTableQueryCondition_xmdl')
      }
    },
    // 项目大类下拉框
    loadXmdlSelect ({commit, state}, data) {
      return CommonService.getTableInfo(data.bbmc, data.params || {}, state.colMap).then((res) => {
        commit('setSelectXmdl', res.data[0]['xmid'])
        commit('setXmdllist', res.data[0]['xmid'] === 0 ? [] : res.data)
        commit('setTableQueryCondition_lxfx')
        commit('setChartMap', {
          categorys: [''],
          yData: [0],
          y2Data: [0],
          lineData: [0]
        })
        commit('setChartlist', [])
      })
    },
    // chart
    loadContentChart ({commit, state}, data) {
      return CommonService.getTableInfo(data.bbmc, data.params || {}, state.lxfxColMap).then((result) => {
        let categorys = []
        let yData = []
        let y2Data = []
        let lineData = []
        result.data.forEach((item, index) => {
          if (item['month']) {
            categorys.push(item['month'])
            yData.push(Number(item['wzs'] || 0).toFixed(2)) // 物资
            y2Data.push(Number(item['gcs'] || 0).toFixed(2)) // 工程
            lineData.push(Number((item['wcl'] || 0)) * 100) // 完成率
          }
        })
        commit('setChartMap', {
          categorys: categorys,
          yData: yData,
          y2Data: y2Data,
          lineData: lineData
        })
        commit('setChartlist', result.data)
      })
    }
  }
}

