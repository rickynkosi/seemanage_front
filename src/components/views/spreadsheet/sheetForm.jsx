import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getSheet, saveSheet } from '../../../services/sheetService';
// import { getGenres } from '../../services/Service';


class SheetForm extends Form {
    state = { 
        data: { districtcode: '', districtname: '' },
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        districtcode: Joi.string().required().label('District Code'),
        districtname: Joi.string().required().label('District Name')
    };

    async populateSheet(){
        try{
            const sheetId = this.props.match.params.id;
            if (sheetId === "new") return;

            const { data: sheet } = await getSheet(sheetId);
            this.setState({ data: this.mapToViewModel(sheet) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        await this.populateSheet();
    }

    mapToViewModel(sheet){
        return {
            _id: sheet._id,
            sheetcode: sheet.sheetcode,
            sheetname: sheet.sheetname,
        };
    }

    doSubmit = async () => {
        await saveSheet(this.state.data);

        this.props.history.push("/sheet");
    };


    render() { 
        return (
            <div>
                <h1>Sheet Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('name','name')}
                    {this.renderInput('name2','name2')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default SheetForm;