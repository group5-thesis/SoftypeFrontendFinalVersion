import React from "react"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CFormGroup, CSelect } from "@coreui/react";
import { MONTHS } from 'utils/constants/constant'

export let navigate = {
    PREVIOUS: 'PREV',
    NEXT: 'NEXT',
    TODAY: 'TODAY',
    DATE: 'DATE',
}

class CustomToolbar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        if(this.props.clickable){
            const month = MONTHS[this.props.date.getMonth()];
            const year = this.props.date.getFullYear()
            this.props.onMonthChange(month)
            this.props.onYearChange(year)
        }
    }

    navigate = action => {
        this.props.onNavigate(action);
    }
    handleChange = (event) => {
        this.props.onView(this.props.clickable?event.target.value:'month');
    };
    render() {
        let { label, views, header } = this.props
        let { right = true, left = true } = header
        return (
            <div className="rbc-toolbar">
                {
                    left && <span className="rbc-btn-group">
                        <button type="button" onClick={this.navigate.bind(null, navigate.PREVIOUS)}>Prev</button>
                        <button type="button" onClick={this.navigate.bind(null, navigate.NEXT)}>Next</button>
                    </span>
                }
                <span className="rbc-toolbar-label">{label}</span>
                {
                    right && <CFormGroup>
                        <CSelect
                            custom
                            onChange={this.handleChange}>
                            <option value="" hidden>month</option>
                            {views.map((view, idx) => {
                                return <option key={idx} value={view}>{view}</option>
                            })}
                        </CSelect>
                    </CFormGroup>
                }

            </div>
        )
    }

}


export default CustomToolbar;
