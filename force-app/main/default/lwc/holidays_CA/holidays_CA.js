import { LightningElement } from 'lwc';
import getHolidays from '@salesforce/apex/HolidaysController.getHolidays';
import saveFavorite from '@salesforce/apex/HolidaysController.saveFavorite';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

const yearOptions = [
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
];

const countryOptions = [
        { label: 'Canada', value: 'CA' },
        { label: 'India', value: 'IN' },
        { label: 'United States', value: 'US' },
    ];

const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Date', fieldName: 'date' },
    { label: 'Description', fieldName: 'description' },
    {label: 'Favorite', type: 'button', 
    typeAttributes: {
        iconName: {fieldName : 'fav'},
        title: 'Favorite',
        variant: 'base',
        alternativeText: 'View'
    }
    }
];

export default class Holidays_CA extends LightningElement {

    country = 'CA';
    year = '2020';
    holidays = [];
    columns = columns;
    showHolidays = false;
    showLoading = false;
    
    countryOptions = countryOptions;
    yearOptions = yearOptions;


    handleGetHolidays(){
        this.showLoading = true;
        console.log(this.country, this.year);
        getHolidays({country: this.country, year: this.year})
        .then(result => {
            console.log(result);
            result = JSON.parse(result);
            this.showHolidays = true;
            this.showLoading = false;
            this.holidays = result.response.holidays;
            for(let i=0;i<this.holidays.length;i++){
            
                this.holidays[i]['fav'] = 'utility:favorite';
                this.holidays[i]['date'] = this.holidays[i].date.iso;
                this.holidays[i]['index'] = i;
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleRowAction(event){
        const row = event.detail.row;
        let holidayName =  this.holidays[row.index] == 'utility:favorite' ? row.name : '';
        
        saveFavorite({holidayName:holidayName})
        .then(result => {
            if(this.holidays[row.index].fav == 'utility:favorite'){
                this.holidays[row.index].fav = 'utility:check';
                this.showToast('success', 'Favorite added','Success');
            }
            else{
                this.holidays[row.index].fav = 'utility:favorite';
                this.showToast('success', 'Favorite removed','Success');
            }

            this.holidays = [... this.holidays];
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleYearChange(event){
        this.year = event.detail.value;
    }

    handleCountryChange(event){
        this.country = event.detail.value;;
    }

    showToast(variant, message,title){
        this.dispatchEvent( new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        }));
    }
}