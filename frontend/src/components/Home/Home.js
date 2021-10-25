import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../App.js'
import store from '../../redux/store'
import BackendAPIAccess from '../BackendAPIAccess/BackendAPIAccess.js'
import { CCSIZE_MAP, LOCALE_MAP, HIGHDEG_MAP, PROGRAM_MAP } from './enum_mappings.js'
import './Home.css'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    document.title = 'MA Schools'
  }

  render() {
    return (
      <div className='HomeWrapper'>
        <div className='HomeContent'>
          <h2>Schools of MA</h2>
          <SchoolTable />
        </div>
      </div>
    )
  }
}

class SchoolTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minSchoolData: [],
      singleSchool: {},
      numberOfPages: undefined,
      sort: "",
      sortType: "desc",
      page: 1
    }
    BackendAPIAccess.getSchools().then((response) => {
      this.setState({ minSchoolData: response.data.schools, numberOfPages: response.data.numberOfPages })
    })
  }

  sortSchools(domId) {
    var sortType = "desc"

    if ($('#' + domId).attr('sortAsc')) {
      sortType = "asc"
      $('#' + domId).removeAttr('sortAsc')
    } else {
      $('#' + domId).attr('sortAsc', "1")
    }

    var keyword = $('#' + domId).data('sort')
    BackendAPIAccess.getSchoolsSorted(keyword, sortType, this.state.page).then((response) => {
      this.setState({ minSchoolData: response.data.schools, sort: keyword, sortType: sortType })
    })
  }

  paginateSchools(page) {
    if (this.state.sort != "") {
      BackendAPIAccess.getSchoolsSorted(this.state.sort, this.state.sortType, page).then((response) => {
        this.setState({ minSchoolData: response.data.schools, page: page })
      })
    } else {
      BackendAPIAccess.getSchools(page).then((response) => {
        this.setState({ minSchoolData: response.data.schools, page: page })
      })
    }
  }

  showSchoolDetails(id) {
    BackendAPIAccess.getSingleSchool(id).then((response) => {
      this.setState({ singleSchool: response.data})
      $('#schoolModal').modal('toggle')
    })
  }

  render() {
    var numberOfPages = this.state.numberOfPages;
    return (
      <div>
        <SchoolModal schoolData={this.state.singleSchool}/>
        <div id="SchoolTable">      
          <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
              <tr>
                <th id="instnm" className="mdl-data-table__cell--non-numeric sortHeader" onClick={() => this.sortSchools('instnm')} data-sort="INSTNM">School</th>
                <th id="adm_rate" className="sortHeader" onClick={() => this.sortSchools('adm_rate')} data-sort="ADM_RATE">Admission Rates</th>
                <th id="sat_avg" className="sortHeader" onClick={() => this.sortSchools('sat_avg')} data-sort="SAT_AVG">SAT Avg</th>
              </tr>
            </thead>
            <tbody> 
              {this.state.minSchoolData.map((school, index) => {
                return (
                  <tr className="schoolRow" key={school.UNITID} data-school-id={school.UNITID} onClick={() => this.showSchoolDetails(school.UNITID)}>
                    <th className="mdl-data-table__cell--non-numeric">{school.INSTNM}</th>
                    <td>{school.ADM_RATE == "NULL" ? "N/A" : (school.ADM_RATE * 100).toFixed(2) + "%"}</td>
                    <td>{school.SAT_AVG == "NULL" ? "N/A" : school.SAT_AVG}</td>
                  </tr>
                );
              })}           
            </tbody>
          </table>
          <div className="customPagination">
            { 
              typeof numberOfPages != 'undefined' && numberOfPages.length != 0 ?
              ([...Array(numberOfPages)].map((num, index) => <span className="pageNumbers" onClick={() => this.paginateSchools(index + 1)} key={index + 1}>{index + 1}</span>)) : 
              (<div></div>)

            }
          </div>
        </div>
      </div>
    )
  }
}

class SchoolModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schoolData: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schoolData.UNITID != this.props.schoolData.UNITID) {
      this.setState({
        schoolData: this.props.schoolData
      })
    }
  }

  render() {
    var sData = this.state.schoolData

    return (
      <div id="schoolModal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h5 className="modal-title schoolDesc">{sData.INSTNM}</h5>
                <div className="schoolDesc">{sData.CITY + ", " + sData.STABBR + " " + sData.ZIP}</div>
                <div className="schoolDesc"><a href={'https://' + sData.INSTURL} target="_blank">{sData.INSTURL}</a></div>
              </div>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="list-group">
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Stats</h5>
                  </div>
                  <div className="schoolInfo"><strong>SAT Average:</strong> {sData.SAT_AVG == "NULL" ? "N/A" : sData.SAT_AVG}</div>
                  <div className="schoolInfo"><strong>Admission Rate:</strong> {sData.ADM_RATE == "NULL" ? "N/A" : (sData.ADM_RATE * 100).toFixed(2) + "%"}</div>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">School Info:</h5>
                  </div>
                  <div className="schoolInfo"><strong>Size:</strong> {sData.CCSIZSET == "NULL" ? "N/A" : CCSIZE_MAP[sData.CCSIZSET]}</div>
                  <div className="schoolInfo"><strong>Highest Degree:</strong> {sData.HIGHDEG == "NULL" ? "N/A" : HIGHDEG_MAP[sData.HIGHDEG]}</div>
                  <div className="schoolInfo"><strong>Carnegie Classification:</strong> {sData.CCSIZSET == "NULL" ? "N/A" : CCSIZE_MAP[sData.CCSIZSET]}</div>
                  <div className="schoolInfo"><strong>Locale of Institution:</strong> {sData.LOCALE == "NULL" ? "N/A" : LOCALE_MAP[sData.LOCALE]}</div>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Programs:</h5>
                  </div>
                  {
                    typeof sData.PROGRAMS == 'undefined' || sData.PROGRAMS.length == 0 ? (
                      <div>N/A</div>
                    ) : (
                      sData.PROGRAMS.map((program, index) => {
                        return (
                          <div key={ program } className="schoolInfo"><strong>{program}:</strong> {PROGRAM_MAP[program]}</div>
                        );
                      })
                    )
                  }      
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
