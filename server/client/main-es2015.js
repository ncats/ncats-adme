(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/0B0":
/*!********************************************!*\
  !*** ./src/app/loading/loading.service.ts ***!
  \********************************************/
/*! exports provided: LoadingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingService", function() { return LoadingService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");



class LoadingService {
    constructor() {
        this.loadingStateEmitter = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    get isLoading() {
        return this.loadingStateEmitter.asObservable();
    }
    setLoadingState(isLoading) {
        this.loadingStateEmitter.next(isLoading);
    }
}
LoadingService.ɵfac = function LoadingService_Factory(t) { return new (t || LoadingService)(); };
LoadingService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoadingService, factory: LoadingService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadingService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "/cuJ":
/*!*********************************************************************************!*\
  !*** ./src/app/google-analytics/track-link-event/track-link-event.directive.ts ***!
  \*********************************************************************************/
/*! exports provided: TrackLinkEventDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackLinkEventDirective", function() { return TrackLinkEventDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _google_analytics_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../google-analytics.service */ "c3Jj");



class TrackLinkEventDirective {
    constructor(gaService) {
        this.gaService = gaService;
        this.evCategory = 'Undefined';
        this.evAction = 'click-link';
    }
    onClick(element) {
        this.evLabel = element.href;
        this.gaService.sendEvent(this.evAction, this.evCategory, this.evLabel, this.evValue);
    }
}
TrackLinkEventDirective.ɵfac = function TrackLinkEventDirective_Factory(t) { return new (t || TrackLinkEventDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_google_analytics_service__WEBPACK_IMPORTED_MODULE_1__["GoogleAnalyticsService"])); };
TrackLinkEventDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: TrackLinkEventDirective, selectors: [["", "admeTrackLinkEvent", ""]], hostBindings: function TrackLinkEventDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TrackLinkEventDirective_click_HostBindingHandler($event) { return ctx.onClick($event.target); });
    } }, inputs: { evCategory: "evCategory", evAction: "evAction", evLabel: "evLabel", evValue: "evValue" } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TrackLinkEventDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[admeTrackLinkEvent]'
            }]
    }], function () { return [{ type: _google_analytics_service__WEBPACK_IMPORTED_MODULE_1__["GoogleAnalyticsService"] }]; }, { evCategory: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], evAction: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], evLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], evValue: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], onClick: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['click', ['$event.target']]
        }] }); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\neyraj2\Spotlight\ADME_RLM\client\src\main.ts */"zUnb");


/***/ }),

/***/ "5JNg":
/*!**************************************************!*\
  !*** ./src/app/text-file/text-file.component.ts ***!
  \**************************************************/
/*! exports provided: TextFileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextFileComponent", function() { return TextFileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _file_type_defaults_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-type-defaults.constant */ "BUg/");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _utilities_file_select_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/file-select.directive */ "N4mv");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "qFsG");











class TextFileComponent {
    constructor() {
        this.fileType = 'csv';
        this.options = {
            lineBreak: '\n',
            columnSeparator: '\t',
            hasHeaderRow: true,
            indexIdentifierColumn: 0
        };
        this.fileUploadStarted = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.fileDataAdded = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.fileUploadFinished = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.fileProcess = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.subscriptions = [];
    }
    ngOnInit() {
        const fileType = localStorage.getItem('fileType');
        if (fileType) {
            this.fileType = fileType;
        }
        const options = localStorage.getItem(`${this.fileType}_options`);
        if (options) {
            this.options = JSON.parse(options);
        }
        else {
            this.options = _file_type_defaults_constant__WEBPACK_IMPORTED_MODULE_1__["fileTypeDefaults"][this.fileType];
        }
        this.acceptedFileTypes = Object.keys(_file_type_defaults_constant__WEBPACK_IMPORTED_MODULE_1__["fileTypeDefaults"]);
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
    fileSelected(file) {
        if (file) {
            this.selectedFile = file;
            this.selectedFileName = file.name;
            const fileNameParts = this.selectedFileName.split('.');
            const fileExtension = fileNameParts[fileNameParts.length - 1];
            if (this.acceptedFileTypes.indexOf(fileExtension) > -1) {
                this.fileType = fileExtension;
                this.updateType();
            }
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.selectedFileContent = fileReader.result;
            };
            fileReader.readAsText(file);
        }
        else {
            this.selectedFile = null;
            this.selectedFileName = null;
            this.selectedFileContent = null;
        }
    }
    updateType() {
        localStorage.setItem('fileType', this.fileType);
        const options = localStorage.getItem(`${this.fileType}_options`);
        if (options) {
            this.options = JSON.parse(options);
        }
        else {
            this.options = _file_type_defaults_constant__WEBPACK_IMPORTED_MODULE_1__["fileTypeDefaults"][this.fileType];
        }
    }
    updateOptions() {
        const options = JSON.stringify(this.options);
        localStorage.setItem(`${this.fileType}_options`, options);
    }
    processFile() {
        const fileForm = {
            lineBreak: this.options.lineBreak,
            columnSeparator: this.options.columnSeparator,
            hasHeaderRow: this.options.hasHeaderRow,
            indexIdentifierColumn: this.options.indexIdentifierColumn,
            file: this.selectedFile
        };
        this.fileProcess.emit(fileForm);
        // const rows = this.selectedFileContent.toString().split(/\r\n|\r|\n/g);
        // if (rows.length === 1) {
        //   alert('Either your file does not have any data or you have selected the wrong line break');
        // } else {
        //   const identifiers = [];
        //   for (let i = this.options.numHeaderRows; i < rows.length; i++) {
        //     const cells = rows[i].split(this.options.columnSeparator);
        //     if (cells[this.options.indexIdentifierColumn]) {
        //       identifiers.push(cells[this.options.indexIdentifierColumn]);
        //     }
        //   }
        //   this.fileUploadStarted.emit(identifiers.length);
        // }
    }
}
TextFileComponent.ɵfac = function TextFileComponent_Factory(t) { return new (t || TextFileComponent)(); };
TextFileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TextFileComponent, selectors: [["adme-text-file"]], inputs: { fileSelected: "fileSelected" }, outputs: { fileUploadStarted: "fileUploadStarted", fileDataAdded: "fileDataAdded", fileUploadFinished: "fileUploadFinished", fileProcess: "fileProcess" }, decls: 52, vars: 10, consts: [[1, "text-file-body"], [1, "description"], ["href", "https://support.office.com/en-us/article/import-or-export-text-txt-or-csv-files-5250ac4c-663c-47ce-937b-339e391393ba", "target", "_blank"], ["mat-raised-button", "", "color", "primary", "admeFileSelect", "", 3, "selectedFile"], [1, "text-file-form"], ["textFileForm", "ngForm"], [1, "form-body"], [1, "file-type"], ["name", "fileType", "required", "", 3, "ngModel", "ngModelChange", "selectionChange"], ["value", "csv"], ["value", "text"], ["value", "smi"], [1, "column-separator"], ["name", "columnSeparator", "required", "", "matTooltip", "Set of characters used to separate columns", 3, "ngModel", "ngModelChange", "selectionChange"], [3, "value"], [1, "header-row"], ["name", "hasHeaderRow", "required", "", "matTooltip", "True if dataset has a header row and false if it doesn't", 3, "ngModel", "ngModelChange", "selectionChange"], [1, "smiles-column-number"], ["type", "number", "matInput", "", "placeholder", "SMILES column number", "name", "indexIdentifierColumn", "required", "", "matTooltip", "The column number that contains the SMILES starting from 0.", 3, "ngModel", "ngModelChange", "change"], [1, "form-actions"], [1, "space-between"], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click"]], template: function TextFileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Select a text file containing a list of smiles, but try to keep the size of the data to under 10,000 rows. Anything above 10,000 rows may take several minutes. If you have an Excel file, follow ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "these instructions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " to export it as Text or CSV. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedFile", function TextFileComponent_Template_button_selectedFile_7_listener($event) { return ctx.fileSelected($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Browse");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "form", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "File type");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-select", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TextFileComponent_Template_mat_select_ngModelChange_18_listener($event) { return ctx.fileType = $event; })("selectionChange", function TextFileComponent_Template_mat_select_selectionChange_18_listener() { return ctx.updateType(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "mat-option", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " CSV ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "mat-option", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Text ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "mat-option", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " SMI ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Column separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "mat-select", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TextFileComponent_Template_mat_select_ngModelChange_29_listener($event) { return ctx.options.columnSeparator = $event; })("selectionChange", function TextFileComponent_Template_mat_select_selectionChange_29_listener() { return ctx.updateOptions(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "mat-option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, " Comma (,) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "mat-option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " Tab (\\t) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Has header row");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "mat-select", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TextFileComponent_Template_mat_select_ngModelChange_38_listener($event) { return ctx.options.hasHeaderRow = $event; })("selectionChange", function TextFileComponent_Template_mat_select_selectionChange_38_listener() { return ctx.updateOptions(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "mat-option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, " Yes ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "mat-option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, " No ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TextFileComponent_Template_input_ngModelChange_45_listener($event) { return ctx.options.indexIdentifierColumn = $event; })("change", function TextFileComponent_Template_input_change_45_listener() { return ctx.updateOptions(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "mat-hint");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Zero indicates that the SMILES are in the first column");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "span", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TextFileComponent_Template_button_click_50_listener() { return ctx.processFile(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, " Process file ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" \u00A0 ", ctx.selectedFileName ? "Selected file: " + ctx.selectedFileName : "No file selected", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.fileType);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.options.columnSeparator);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ",");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", "\t");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.options.hasHeaderRow);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.options.indexIdentifierColumn);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", _r0.invalid || !ctx.selectedFileName || !ctx.selectedFileContent);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"], _utilities_file_select_directive__WEBPACK_IMPORTED_MODULE_3__["FileSelectDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_6__["MatSelect"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatOption"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__["MatTooltip"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NumberValueAccessor"], _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatHint"]], styles: [".text-file-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.text-file-form[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  overflow: auto;\n}\n\n.description[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.form-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\n.form-body[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:not(:last-child) {\n  padding-right: 10px;\n}\n\n.mat-form-field[_ngcontent-%COMP%]:not(:first-child) {\n  margin-left: 15px;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  padding-top: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHRleHQtZmlsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFQTtFQUNJLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBQ0o7O0FBQ0k7RUFDSSxtQkFBQTtBQUNSOztBQUdBO0VBQ0ksaUJBQUE7QUFBSjs7QUFHQTtFQUNJLGFBQUE7RUFDQSxpQkFBQTtBQUFKIiwiZmlsZSI6InRleHQtZmlsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi50ZXh0LWZpbGUtYm9keSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLnRleHQtZmlsZS1mb3JtIHtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGZsZXgtZ3JvdzogMTtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcblxyXG4uZGVzY3JpcHRpb24ge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLmZvcm0tYm9keSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuXHJcbiAgICAmID4gZGl2Om5vdCg6bGFzdC1jaGlsZCkge1xyXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5tYXQtZm9ybS1maWVsZDpub3QoOmZpcnN0LWNoaWxkKSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTVweDtcclxufVxyXG5cclxuLmZvcm0tYWN0aW9ucyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgcGFkZGluZy10b3A6IDE1cHg7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TextFileComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-text-file',
                templateUrl: './text-file.component.html',
                styleUrls: ['./text-file.component.scss']
            }]
    }], function () { return []; }, { fileUploadStarted: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], fileDataAdded: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], fileUploadFinished: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], fileProcess: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], fileSelected: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "9vUh":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _google_analytics_track_link_event_track_link_event_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../google-analytics/track-link-event/track-link-event.directive */ "/cuJ");



class HomeComponent {
    ngOnInit() { }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["adme-home"]], decls: 11, vars: 0, consts: [[1, "container"], [1, "inner-container"], [2, "text-align", "justify"], ["href", "https://github.com/ncats/ncats-adme/", "target", "_blank", "admeTrackLinkEvent", "", "evLabel", "github"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Background ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " ADME@NCATS is a resource developed for the scientific community by NCATS to host in silico prediction models for different ADME endpoints. The resource allows prediction of different pharmacokinetic properties of small molecules which is potentially useful for structure optimization in early drug discovery. Users can provide input as a CSV/Text file containing SMILES. Alternatively, the users can sketch a molecule using the editor provided. For each compound, the predictions from the models are provided as output along with the confidence scores. Those users who cannot upload their data are encouraged to ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "download the self-contained instance of ADME@NCATS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " that can be run locally. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " A subset of data that were used for developing the models are provided for download. The users are encouraged to use these data for development and validation of future QSAR models. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_google_analytics_track_link_event_track_link_event_directive__WEBPACK_IMPORTED_MODULE_1__["TrackLinkEventDirective"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-home',
                templateUrl: './home.component.html',
                styleUrls: ['./home.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    apiBaseUrl: '/',
    configFileLocation: null,
    googleAnalyticsId: null
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "BUg/":
/*!**********************************************************!*\
  !*** ./src/app/text-file/file-type-defaults.constant.ts ***!
  \**********************************************************/
/*! exports provided: fileTypeDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileTypeDefaults", function() { return fileTypeDefaults; });
const fileTypeDefaults = {
    csv: {
        lineBreak: '\n',
        columnSeparator: ',',
        hasHeaderRow: true,
        indexIdentifierColumn: 0
    },
    text: {
        lineBreak: '\n',
        columnSeparator: '\t',
        hasHeaderRow: true,
        indexIdentifierColumn: 0
    },
    smi: {
        lineBreak: '\n',
        columnSeparator: '\t',
        hasHeaderRow: false,
        indexIdentifierColumn: 0
    }
};


/***/ }),

/***/ "Cxl7":
/*!******************************************!*\
  !*** ./src/app/config/config.service.ts ***!
  \******************************************/
/*! exports provided: ConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigService", function() { return ConfigService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _utilities_deploy_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/deploy-url */ "kUsB");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");






class ConfigService {
    constructor(http, baseHref, deployUrl) {
        this.http = http;
        this.baseHref = baseHref;
        this.deployUrl = deployUrl;
    }
    // This is the method you want to call at bootstrap
    // Important: It should return a Promise
    load() {
        this._configData = null;
        const configFilePath = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].configFileLocation ?
            src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].configFileLocation : `${this.deployUrl || '/'}assets/data/config.json`;
        return this.http
            .get(configFilePath)
            .toPromise()
            .then((config) => {
            if (config.apiBaseUrl == null && src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiBaseUrl != null) {
                config.apiBaseUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiBaseUrl;
            }
            if (config.googleAnalyticsId == null && src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].googleAnalyticsId != null) {
                config.googleAnalyticsId = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].googleAnalyticsId;
            }
            this._configData = config;
        })
            .catch((err) => Promise.resolve());
    }
    get configData() {
        return this._configData;
    }
    set configData(configData) {
        this._configData = configData;
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__["APP_BASE_HREF"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_3__["DEPLOY_URL"])); };
ConfigService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConfigService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["APP_BASE_HREF"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_3__["DEPLOY_URL"]]
            }] }]; }, null); })();


/***/ }),

/***/ "H/QM":
/*!*********************************************!*\
  !*** ./src/app/sketcher/sketcher.module.ts ***!
  \*********************************************/
/*! exports provided: SketcherModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SketcherModule", function() { return SketcherModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _sketcher_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sketcher.component */ "oozq");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");





class SketcherModule {
}
SketcherModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: SketcherModule });
SketcherModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function SketcherModule_Factory(t) { return new (t || SketcherModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SketcherModule, { declarations: [_sketcher_component__WEBPACK_IMPORTED_MODULE_2__["SketcherComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"]], exports: [_sketcher_component__WEBPACK_IMPORTED_MODULE_2__["SketcherComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SketcherModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _sketcher_component__WEBPACK_IMPORTED_MODULE_2__["SketcherComponent"]
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"]
                ],
                exports: [
                    _sketcher_component__WEBPACK_IMPORTED_MODULE_2__["SketcherComponent"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "HfCQ":
/*!********************************************!*\
  !*** ./src/app/method/method.component.ts ***!
  \********************************************/
/*! exports provided: MethodComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MethodComponent", function() { return MethodComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/deploy-url */ "kUsB");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _google_analytics_track_link_event_track_link_event_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../google-analytics/track-link-event/track-link-event.directive */ "/cuJ");







function MethodComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " RLM Model ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Name:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Rat Liver Microsomal Stability");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Dataset Type:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Classification");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Dataset Size:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "22,016 compounds");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Validation:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "5-Fold CV and Time-Split CV");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Descriptors:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Molecular Graphs");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Model Details:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " The model is based on a message-passing variant of graph convolutional neural network (GCNN) that directly operates on molecular graphs. The model was built using MIT's ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Chemprop");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, ", described in ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "this paper");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, ". In this case, we retained the default parameters. A variant that considers additional features such as RDKit descriptors will be added in future.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Interpretation of Models:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " The model provides predicted class (1 or 0) for a given compound. If the predicted class is '1', it means the compound is predicted as unstable (t");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "sub");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "1/2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, " <= 30 min) and if the predicted class is '0', the compound is predicted as stable (t");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "sub");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "1/2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, " > 30 min). The model also provides a probability score (between 0 and 1), shown in parentheses next to the predicted class.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Data for Download:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, " A subset of the dataset used for developing these models is available for download. Click ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "here");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, " to download. Alternatively, this data is also available from PubChem Bioassay database: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "AID 1508591");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, ". ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, " RLM Assay Protocol ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, " Experiments were performed using a Freedom Evo 200 automated platform with a 96-channel (MCA96) head with EVOware software (version 3.2) (Tecan Inc., M\u00E4nnedorf, Switzerland). The system also includes an Inheco heating block and cooling block (Inheco, Munich, Germany). Six standard controls were tested in each run: buspirone, propranolol, diclofenac, loperamide, carbamazepine and antipyrine. The assay incubation system consisted of 0.5 mg/mL of rat microsomal protein (Strain: Sprague-Dawley), 1.0 \u03BCM drug concentration, and NADPH regeneration system (containing 0.650 mM NADP+, 1.65 mM glucose 6-phosphate, 1.65 mM MgCl2, and 0.2 unit/mL G6PDH) in 100 mM phosphate buffer at pH 7.4. The incubation was carried out at 37 \u00B0C for 15 min. The reaction was quenched by adding 555 \u03BCL of acetonitrile containing 0.28 \u03BCM albendazole, an internal standard. After a 20-minute centrifugation at 3000 rpm at 4\u00B0C, 30 \u03BCL of the supernatant was transferred to an analysis plate and was diluted five-fold using 1:2 v/v acetonitrile/water. Sample quantification and analysis was performed using a previously described method (Shah et al., 2016) with minor modifications. The t");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "sub");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "1/2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, " values were capped at 30 minutes since for a 15-minute assay, the data cannot be extrapolated beyond 30 minutes (Di et al., 2004). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, " References: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "ol");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, " Shah, P. et al. An Automated High-Throughput Metabolic Stability Assay Using an Integrated High Resolution Accurate Mass Method and Automated Data Analysis Software. Drug Metab Dispos. 44, 1653-1661 (2016). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, " Di, L. et al. Experimental design on single-time-point high-throughput microsomal stability assay. J Pharm Sci. 93, 1537-1544 (2004). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", ctx_r0.dataDownloadHref, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function MethodComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " PAMPA Model ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Name:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Parallel artificial membrane permeability assay (PAMPA)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Dataset Type:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Classification");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Dataset Size:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "16,624 compounds");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Validation:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "5-Fold CV");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Descriptors:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Molecular Graphs");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Model Details:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " The model is based on a message-passing variant of graph convolutional neural network (GCNN) that directly operates on molecular graphs. The model was built using MIT's ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Chemprop");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, ", described in this ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "this paper");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, ". In this case, we retained the default parameters. A variant that considers additional features such as RDKit descriptors will be added in future. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Interpretation of Models:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " The model provides predicted class (1 or 0) for a given compound. If the predicted class is '1', it means the compound is predicted to have 'low or moderate permeability' (i.e., log P");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "sub");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "eff");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, " < 2.0) and if the predicted class is '0', the compound is predicted to have 'high permeability' (i.e., log P");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "sub");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "eff");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, " > 2.5). The models also provide a probability score (between 0 and 1), shown in parentheses next to the predicted class. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "PAMPA Assay Protocol:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, " The stirring double-sink PAMPA method patented by pION Inc. (Billerica, MA) was employed to determine the permeability of compounds via PAMPA passive diffusion. The PAMPA lipid membrane, which consisted of an artificial membrane of a proprietary lipid mixture and dodecane (Pion Inc.), was optimized to predict gastrointestinal tract (GIT) passive diffusion permeability. This membrane was immobilized on a plastic matrix of a 96 well \u201Cdonor\u201D filter plate placed below a 96 well \u201Cacceptor\u201D plate. This artificial membrane mimicked the GIT membrane in the human body. Both \u201Cdonor\u201D and \u201Cacceptor\u201D wells were buffered to pH 7.4. The test articles, stocked in 10 mM DMSO solutions, were diluted to 0.05 mM in aqueous buffer (pH 7.4) and the concentration of DMSO was 0.5% in the final solution. During the 30-minute permeation period at room temperature the test samples in the donor compartment were stirred using the Gutbox technology (Pion Inc.) to reduce the unstirred water layer. The test article concentrations in the \u201Cdonor\u201D and \u201Cacceptor\u201D compartments were measured using a UV plate reader (Nano Quant, Infinite\u00AE 200 PRO, Tecan Inc., M\u00E4nnedorf, Switzerland). Permeability calculations were performed using Pion Inc. software and were expressed in the units of 10");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "sup");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "-6");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "cm/s. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MethodComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Solubility Model ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Name:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Pion\u2019s patented \u00B5SOL assay (Solubility)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Dataset Type:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Classification");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Dataset Size:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "22,209 compounds");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Validation:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "5-Fold CV");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Descriptors:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Molecular graphs");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Model Details:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " The model is based on a message-passing variant of graph convolutional neural network (GCNN) that directly operates on molecular graphs. The model was built using MIT's ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Chemprop");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, ", described in this ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "this paper");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, ". In this case, we retained the default parameters. A variant that considers additional features such as RDKit descriptors will be added in future. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Interpretation of Models:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " The model provides predicted class (1 or 0) for a given compound. If the predicted class is '1', it means the compound is predicted to have 'low solubility' (i.e., <10 \u00B5g/ml) and if the predicted class is '0', the compound is predicted to have 'high solubility' (i.e., >10 \u00B5g/ml). The models also provide a probability score (between 0 and 1), shown in parentheses next to the predicted class. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Solubility Assay Protocol:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, " Pion\u2019s patented \u00B5SOL assay was used for kinetic solubility determination. In this assay, the classical saturation shake-flask solubility method was adapted as previously described by Avdeef et al., 2001. Test compounds were prepared in 10\u202FmM DMSO stock and diluted to a final drug concentration of 150\u202F\u00B5M in the aqueous solution (pH 7.4, 100\u202FmM phosphate buffer). Samples were incubated at room temperature for 6\u202Fh and vacuum-filtered using Tecan Te-Vac to remove any precipitates. The concentration of the compound in the filtrate was measured via UV absorbance (\u03BB: 250\u2013498\u202Fnm). The filtrate drug concentration was determined by comparing the fully solubilized reference plate which contains 17\u202F\u00B5M of compound dissolved in spectroscopically pure n-propanol. All compounds were tested in duplicates. The kinetic solubility (\u00B5g/mL) of compounds was calculated using the \u00B5SOL Evolution software. The three experimental controls used were albendazole (low solubility), phenazopyridine (moderate solubility) and furosemide (high solubility). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, " References: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "ol");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, " A. Avdeef. Absorption And Drug Development. John Wiley & Sons Inc, Hoboken, New Jersey (2001) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MethodComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " CYP450 Models ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " High-throughput metabolic stability assays: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " The substrate depletion assay was employed to determine metabolic stability, using an established mid-density (384-well format) protocol");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "sup");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, ". The workflow included a robotic system for incubation and sample clean-up, coupled with an automated ultra-high performance liquid chromatography-high resolution mass spectrometry (UHPLC-HRMS) method for sample analysis. Briefly, each 110 \u00B5L reaction mixture consisted of 1 \u00B5M test article, supersomes, and an NADPH regenerating system in 100mM phosphate buffer at pH 7.4. The specific protein and enzyme concentrations, as well as the control compounds utilized are listed in Table 1. Incubations were conducted at 37\u00B0C, with mixing, and reaction aliquots were quenched at 0, 5, 10, 15, 30, and 60 min by addition of cold acetonitrile (ACN) with internal standard (IS), i.e. albendazole. Centrifugation at 3000 g, 4 \u00B0C for 20 min, was used to clear samples of precipitated protein and debris. Sample analysis in an UHPLC-HRMS instrument, data extraction, and half-life (t");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "sub");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "1/2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, ") determinations were performed as previously described");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "sup");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, ". ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " Table 1: Summary of enzyme concentrations, cofactor activities and controls used the P450-Glo assays ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "table", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "thead");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "tr", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " Matrix ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, " Final Protein Concentration [mg/mL] ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " Total CYP content [nM] ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " Cytochrome c Reductase activity [nol/(min x mg protein)] ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " Cytochrome b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "sub");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "5");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, " content [pmol/mg protein] ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, " High clearance controls ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " Moderate clearance controls ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, " Low clearance controls ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, " CYP3A4 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, " ~0.2 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, " 30 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, " 2900 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, " 1090 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, " Buspirone, Loperamide ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, " Ketoconazole ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, " Antipyrine, Carbamazepine ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, " CYP2C9 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, " ~0.12 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, " 45 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, " 985 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, " 710 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, " Glyburide, Glimepiride ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, " Tamoxifen ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, " Antipyrine, Meloxicam ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, " CYP2D6 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, " ~0.38 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](83, " 60 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, " 3000 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, " Bufuralol, Desipramine, Amitriptyline ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, " Mexiletine ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, " Codeine ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, " P450-Glo qHTS: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](97, " The P450-Glo inhibition assay is a luminescent technique used to detect CYP activity, through the liberation of luciferin from CYP probe substrates. P450-Glo assays were performed using a previously described method with minor modifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "sup");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, ". Briefly, 2 \u00B5L of CYP-substrate mix was dispensed into medium-binding white/solid 1,536-well plates using a Flying Reagent Dispenser (FRD, Aurora Discovery, Carlsbad, CA) with the exception of adding Bovine Serum Albumin (BSA) to the mixture for CYP2C9 and CYP2C19. The initial optimization assays for CYP2C9 and CYP2C19 yielded lower signal to background ratios and higher well to well variation. To increase signal and prevent adhesion of protein to tubes of the plate dispenser, 0.4% BSA was added to these two enzyme assays. 23 nL of each positive control (columns 1-4) and test compound (columns 5-48) dissolved in DMSO was transferred to the assay plates using a Wako Pintool station (Wako Automation, San Diego, CA). Positive controls used in these experiments are listed in Table 2. After the control/test compounds were transferred, the assay plates were incubated at room temperature (RT) for 10 min before the addition of 2 \u00B5L NADPH regeneration solution using an FRD. The reaction incubation continued at either RT or 37 \u00B0C for 60 min, and then quenched by FRD addition of 4 \u00B5L of the detection reagent. After a 20 min incubation at room temperature, the luminescence intensity was measured and quantified using a ViewLux plate reader (PerkinElmer, Shelton, CT). Data was expressed as relative luminescence units. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](103, " Table 2: Summary of incubation conditions and positive controls used in the P450-Glo assays ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "table", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "thead");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "tr", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](109, " Enzyme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](111, " Inhibitor ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](113, " Dilution Format ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](115, " Inhibitor Concentration ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](117, " Incubation conditions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](121, " CYP3A4 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](123, " Ketoconazole ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "td", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](126, "16 concentrations/");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](128, "2-fold dilution in");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](130, "duplicates");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](132, " 57 \u00B5M-1.8 nM ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](134, " 1 h/RT ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](137, " CYP2C9 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](138, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](139, " Sulfaphenazole ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](140, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](141, " 57 \u00B5M-1.8 nM ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](143, " 1 h/ 37\u02DAC/ 0.4% BSA ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](145, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](146, " CYP2D6 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](147, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](148, " Quinidine ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](149, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](150, " 1.4 \u00B5M-0.04 nM ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](152, " 1 h/RT ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](153, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](154, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](155, " Parsing of Substrates and Inhibitors: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](157, "table", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](158, "thead");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](159, "tr", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](160, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](161, " Category ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](162, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](163, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](164, "Clearance");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](165, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](166, "/");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](167, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](168, "P450-Glo");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](169, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](170, " Classification ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](171, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](172, " Parsing Rationale ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](173, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](174, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](175, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](176, " 1 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](177, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](178, " + / + ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](179, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](180, " Substrate ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](181, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](182, " Exhibiting activity in both assays, the compound is a clear ligand for the enzyme(s). It is unclear whether the parent, product, or both are responsible for the inhibition. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](183, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](184, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](185, " 2 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](186, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](187, " - / + ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](188, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](189, " Inhibitor ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](190, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](191, " The compound is able to inhibit the enzyme metabolism of a probe substrate, but is not itself cleared, indicating that the parent serves as the inhibitor. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](192, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](193, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](194, " 3 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](195, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](196, " - / - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](197, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](198, " Non-ligand ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](199, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](200, " The lack of activity in either assay signifies that the compound does not associate with the enzyme(s) with sufficient affinity to enable catalysis or inhibition thereof. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](201, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](202, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](203, " 4 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](204, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](205, " + / - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](206, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](207, " Substrate ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](208, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](209, " Although a clear substrate, the binding kinetics of the parent compound and its metabolites do not preclude the concomitant metabolism of the P450-Glo probe. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](210, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](211, " References: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](212, "ol");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](213, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](214, " Shah, P. et al. An Automated High-Throughput Metabolic Stability Assay Using an Integrated High-Resolution Accurate Mass Method and Automated Data Analysis Software. Drug metabolism and disposition: the biological fate of chemicals 44, 1653-1661 (2016). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](215, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](216, " Veith, H. et al. Comprehensive characterization of cytochrome P450 isozyme selectivity across chemical libraries. Nat Biotechnol 27, 1050-1055 (2009). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class MethodComponent {
    constructor(domSanatizer, activatedRoute, deployUrl) {
        this.domSanatizer = domSanatizer;
        this.activatedRoute = activatedRoute;
        this.deployUrl = deployUrl;
        this.model = 'rlm';
        this.dataDownloadHref = domSanatizer.bypassSecurityTrustResourceUrl(`${deployUrl}assets/rlm_public_set.xlsx`);
    }
    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(params => {
            this.model = params['model'];
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
MethodComponent.ɵfac = function MethodComponent_Factory(t) { return new (t || MethodComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__["DEPLOY_URL"])); };
MethodComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MethodComponent, selectors: [["adme-method"]], decls: 5, vars: 4, consts: [[1, "container"], ["class", "inner-container", 4, "ngIf"], [1, "inner-container"], [1, "definitions-container"], [1, "definition"], [1, "name"], [1, "value"], ["href", "https://github.com/chemprop/chemprop", "target", "_blank"], ["href", "https://pubs.acs.org/doi/abs/10.1021/acs.jcim.9b00237", "target", "_blank"], ["target", "_blank", "admeTrackLinkEvent", "", "evAction", "download", "evLabel", "rlm data subset", 3, "href"], ["href", "https://pubchem.ncbi.nlm.nih.gov/assay/assay.cgi?aid=1508591", "target", "_blank", "admeTrackLinkEvent", "", "evLabel", "rlm pubchem"], [2, "text-align", "justify"], [1, "table-container"], [1, "table-description"], [1, "table-responsive-container"], [1, "mat-table"], [1, "mat-header-row"], [1, "mat-header-cell"], [1, "mat-row"], [1, "mat-cell", "strong"], [1, "mat-cell", "center"], ["rowspan", "3", 1, "mat-cell", "center"], [1, "mat-table", "more-padding"], [1, "mat-cell"]], template: function MethodComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MethodComponent_div_1_Template, 77, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MethodComponent_div_2_Template, 61, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MethodComponent_div_3_Template, 55, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MethodComponent_div_4_Template, 217, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.model == "rlm");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.model == "pampa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.model == "solubility");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.model == "cyp450");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _google_analytics_track_link_event_track_link_event_directive__WEBPACK_IMPORTED_MODULE_5__["TrackLinkEventDirective"]], styles: ["h3[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n\n.table-container[_ngcontent-%COMP%] {\n  margin-top: 35px;\n  margin-bottom: 35px;\n}\n\n.table-description[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.54);\n  font-style: italic;\n  margin-bottom: 7px;\n}\n\n.table-responsive-container[_ngcontent-%COMP%] {\n  overflow: auto;\n}\n\ntable[_ngcontent-%COMP%] {\n  min-width: 700px;\n  border-spacing: 0;\n}\n\n.mat-row[_ngcontent-%COMP%] {\n  min-height: 48px;\n  height: 48px;\n}\n\n.mat-cell[_ngcontent-%COMP%] {\n  padding: 0;\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}\n\n.mat-cell.strong[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n\n.mat-cell.center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.more-padding[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%], .more-padding[_ngcontent-%COMP%]   .mat-header-cell[_ngcontent-%COMP%] {\n  padding-left: 15px;\n  margin-right: 15px;\n}\n\n.space-top[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXG1ldGhvZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSwwQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTtFQUNJLGNBQUE7QUFDSjs7QUFFQTtFQUNJLGdCQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFQTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBO0VBQ0ksVUFBQTtFQUNBLHdCQUFBO0VBQ0EsMEJBQUE7QUFDSjs7QUFDSTtFQUNJLGdCQUFBO0FBQ1I7O0FBRUk7RUFDSSxrQkFBQTtBQUFSOztBQUtJO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtBQUZSOztBQU1BO0VBQ0ksZ0JBQUE7QUFISiIsImZpbGUiOiJtZXRob2QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJoMyB7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcblxyXG4udGFibGUtY29udGFpbmVyIHtcclxuICAgIG1hcmdpbi10b3A6IDM1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzNXB4O1xyXG59XHJcblxyXG4udGFibGUtZGVzY3JpcHRpb24ge1xyXG4gICAgY29sb3I6IHJnYmEoMCwwLDAsLjU0KTtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIG1hcmdpbi1ib3R0b206IDdweDtcclxufVxyXG5cclxuLnRhYmxlLXJlc3BvbnNpdmUtY29udGFpbmVyIHtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcblxyXG50YWJsZSB7XHJcbiAgICBtaW4td2lkdGg6IDcwMHB4O1xyXG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XHJcbn1cclxuXHJcbi5tYXQtcm93IHtcclxuICAgIG1pbi1oZWlnaHQ6IDQ4cHg7XHJcbiAgICBoZWlnaHQ6IDQ4cHg7XHJcbn1cclxuXHJcbi5tYXQtY2VsbCB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1zdHlsZTogc29saWQ7XHJcblxyXG4gICAgJi5zdHJvbmcge1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICB9XHJcblxyXG4gICAgJi5jZW50ZXIge1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxufVxyXG5cclxuLm1vcmUtcGFkZGluZyB7XHJcbiAgICAubWF0LWNlbGwsIC5tYXQtaGVhZGVyLWNlbGwge1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTVweDtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5zcGFjZS10b3Age1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MethodComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-method',
                templateUrl: './method.component.html',
                styleUrls: ['./method.component.scss']
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__["DEPLOY_URL"]]
            }] }]; }, null); })();


/***/ }),

/***/ "LToL":
/*!******************************************************************!*\
  !*** ./src/app/predictions-table/predictions-table.component.ts ***!
  \******************************************************************/
/*! exports provided: PredictionsTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PredictionsTableComponent", function() { return PredictionsTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _structure_image_dialog_structure_image_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../structure-image-dialog/structure-image-dialog.component */ "qN8M");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _google_analytics_google_analytics_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../google-analytics/google-analytics.service */ "c3Jj");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/sort */ "Dh3D");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _structure_image_structure_image_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../structure-image/structure-image.directive */ "wgkH");













function PredictionsTableComponent_div_0_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const message_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](message_r4);
} }
function PredictionsTableComponent_div_0_ul_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PredictionsTableComponent_div_0_ul_4_li_1_Template, 2, 1, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.errorMessages);
} }
function PredictionsTableComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PredictionsTableComponent_div_0_ul_4_Template, 2, 1, "ul", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PredictionsTableComponent_div_0_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.clearErrorMessage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.errorMessage, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.errorMessages && ctx_r0.errorMessages.length);
} }
function PredictionsTableComponent_div_1_ng_container_11_mat_header_cell_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const displayedColumn_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r13.displayedColumnsDict[displayedColumn_r11].description);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r13.displayedColumnsDict[displayedColumn_r11].isSmilesColumn ? "mol" : displayedColumn_r11, " ");
} }
function PredictionsTableComponent_div_1_ng_container_11_mat_cell_2_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const displayedColumn_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](row_r16[displayedColumn_r11] == "0 (0.0)" ? "0 (0.01)" : row_r16[displayedColumn_r11]);
} }
function PredictionsTableComponent_div_1_ng_container_11_mat_cell_2_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PredictionsTableComponent_div_1_ng_container_11_mat_cell_2_a_2_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const displayedColumn_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r21.openStructureImageDialog(row_r16[displayedColumn_r11]); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const displayedColumn_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", row_r16[displayedColumn_r11]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("entityId", row_r16[displayedColumn_r11]);
} }
function PredictionsTableComponent_div_1_ng_container_11_mat_cell_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PredictionsTableComponent_div_1_ng_container_11_mat_cell_2_span_1_Template, 2, 1, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PredictionsTableComponent_div_1_ng_container_11_mat_cell_2_a_2_Template, 2, 2, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const displayedColumn_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r14.displayedColumnsDict[displayedColumn_r11].isSmilesColumn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r14.displayedColumnsDict[displayedColumn_r11].isSmilesColumn);
} }
function PredictionsTableComponent_div_1_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PredictionsTableComponent_div_1_ng_container_11_mat_header_cell_1_Template, 3, 2, "mat-header-cell", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PredictionsTableComponent_div_1_ng_container_11_mat_cell_2_Template, 3, 2, "mat-cell", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const displayedColumn_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matColumnDef", displayedColumn_r11);
} }
function PredictionsTableComponent_div_1_mat_header_row_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-header-row");
} }
function PredictionsTableComponent_div_1_mat_row_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-row", 28);
} }
const _c0 = function () { return [5, 10, 25, 100]; };
function PredictionsTableComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Model predictions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PredictionsTableComponent_div_1_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r30); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r29.downloadCSV(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Download");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-paginator", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("page", function PredictionsTableComponent_div_1_Template_mat_paginator_page_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r30); const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r31.pageChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-table", 15, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("matSortChange", function PredictionsTableComponent_div_1_Template_mat_table_matSortChange_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r30); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r32.sortData($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, PredictionsTableComponent_div_1_ng_container_11_Template, 3, 1, "ng-container", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, PredictionsTableComponent_div_1_mat_header_row_12_Template, 1, 0, "mat-header-row", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, PredictionsTableComponent_div_1_mat_row_13_Template, 1, 0, "mat-row", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-paginator", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("page", function PredictionsTableComponent_div_1_Template_mat_paginator_page_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r30); const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r33.pageChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("length", ctx_r1.displayData && ctx_r1.displayData.length || 0)("pageSize", ctx_r1.pageSize)("pageIndex", ctx_r1.page)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx_r1.paged);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.displayedColumns);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx_r1.displayedColumns);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx_r1.displayedColumns);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("length", ctx_r1.displayData && ctx_r1.displayData.length || 0)("pageSize", ctx_r1.pageSize)("pageIndex", ctx_r1.page)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](13, _c0));
} }
class PredictionsTableComponent {
    constructor(dialog, gaService) {
        this.dialog = dialog;
        this.gaService = gaService;
        this.data = [];
        this.displayData = [];
        this.page = 0;
        this.pageSize = 10;
        this.dataHandling = 'replace';
        this.errorMessages = [];
        this.download = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
    }
    set predictionsData(predictions) {
        if (predictions != null) {
            this.predictions = predictions;
            this.displayedColumnsDict = predictions.mainColumnsDict;
            this.displayedColumns = Object.keys(this.displayedColumnsDict).sort((a, b) => {
                return this.displayedColumnsDict[a].order - this.displayedColumnsDict[b].order;
            });
            this.allColumns = predictions.columns;
            if (this.dataHandling === 'replace') {
                this.data = predictions.data;
                this.displayData = this.getNonEmptyPredictions(this.data);
            }
            else {
                const predition = predictions.data[0];
                this.data.push(predition);
                this.displayData = this.displayData.concat(this.getNonEmptyPredictions(predictions.data));
            }
            this.pageChange();
            if (predictions.hasErrors) {
                this.errorMessage = 'The system encountered the following error(s) while processing your request:';
                this.errorMessages = predictions.errorMessages;
            }
        }
        else {
            this.data = null;
            this.displayData = null;
        }
    }
    pageChange(pageEvent) {
        this.clearErrorMessage();
        if (pageEvent != null) {
            if (pageEvent.pageIndex !== this.page) {
                this.gaService.sendEvent('click:button', 'page-change', `predictions:${this.model}`);
            }
            this.page = pageEvent.pageIndex;
            if (pageEvent.pageSize !== this.pageSize) {
                this.gaService.sendEvent('click:select', 'page-size-change', `predictions:${this.model}`);
            }
            this.pageSize = pageEvent.pageSize;
        }
        else {
            this.page = 0;
        }
        this.paged = [];
        const startIndex = this.page * this.pageSize;
        for (let i = startIndex; i < (startIndex + this.pageSize); i++) {
            if (this.displayData[i] != null) {
                this.paged.push(this.displayData[i]);
            }
            else {
                break;
            }
        }
    }
    sortData(sort) {
        if (!sort.active || sort.direction === '') {
            return;
        }
        const data = this.displayData.slice();
        this.displayData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            return this.compare(a[sort.active], b[sort.active], isAsc);
        });
        this.pageChange();
    }
    compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
    clearErrorMessage() {
        this.errorMessage = '';
        this.errorMessages = [];
    }
    getNonEmptyPredictions(data) {
        const predictionColumns = Object.keys(this.displayedColumnsDict).filter(key => !this.displayedColumnsDict[key].isSmilesColumn);
        return data.filter(item => {
            let emptyColumns = 0;
            predictionColumns.forEach(column => {
                if (item[column] == null || item[column] === '') {
                    emptyColumns++;
                }
            });
            return emptyColumns < predictionColumns.length;
        });
    }
    downloadCSV() {
        this.gaService.sendEvent('click:button', 'download', `predictions:${this.model}`);
        this.download.emit({
            data: this.data,
            allColumns: this.allColumns
        });
    }
    openStructureImageDialog(smi) {
        this.dialog.open(_structure_image_dialog_structure_image_dialog_component__WEBPACK_IMPORTED_MODULE_1__["StructureImageDialogComponent"], {
            data: {
                smiles: smi
            }
        });
    }
}
PredictionsTableComponent.ɵfac = function PredictionsTableComponent_Factory(t) { return new (t || PredictionsTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_google_analytics_google_analytics_service__WEBPACK_IMPORTED_MODULE_3__["GoogleAnalyticsService"])); };
PredictionsTableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PredictionsTableComponent, selectors: [["adme-predictions-table"]], inputs: { dataHandling: "dataHandling", model: "model", predictionsData: ["predictions-data", "predictionsData"] }, outputs: { download: "download" }, decls: 2, vars: 2, consts: [["class", "error-message-container", 4, "ngIf"], ["class", "models-output", 4, "ngIf"], [1, "error-message-container"], [1, "error-message"], [4, "ngIf"], [1, "error-message-actions"], ["mat-button", "", "color", "primary", 3, "click"], ["aria-hidden", "false", "aria-label", "Close error message", "svgIcon", "cancel"], [4, "ngFor", "ngForOf"], [1, "models-output"], [1, "top-actions-container"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "fill-middle"], ["showFirstLastButtons", "true", 3, "length", "pageSize", "pageIndex", "pageSizeOptions", "page"], [1, "table-container"], ["matSort", "", 3, "dataSource", "matSortChange"], ["table", ""], [3, "matColumnDef", 4, "ngFor", "ngForOf"], [4, "matHeaderRowDef"], ["fxLayoutAlign", "center start", 4, "matRowDef", "matRowDefColumns"], [3, "matColumnDef"], ["mat-sort-header", "", 4, "matHeaderCellDef"], [4, "matCellDef"], ["mat-sort-header", ""], [3, "matTooltip"], [3, "matTooltip", "click", 4, "ngIf"], [3, "matTooltip", "click"], ["admeStructureImage", "", 1, "table-structure", 3, "entityId"], ["fxLayoutAlign", "center start"]], template: function PredictionsTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, PredictionsTableComponent_div_0_Template, 8, 2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PredictionsTableComponent_div_1_Template, 15, 14, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.errorMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.paged && ctx.paged.length);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatTable"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_9__["MatSort"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatHeaderCell"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_9__["MatSortHeader"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__["MatTooltip"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatCell"], _structure_image_structure_image_directive__WEBPACK_IMPORTED_MODULE_11__["StructureImageDirective"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatRow"]], styles: [".models-output[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  margin-top: 20px;\n}\n.models-output[_ngcontent-%COMP%]   mat-header-row[_ngcontent-%COMP%] {\n  min-height: 48px;\n}\n.table-structure[_ngcontent-%COMP%] {\n  height: 50px;\n  width: auto;\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n.top-actions-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.error-message-container[_ngcontent-%COMP%] {\n  margin: 15px 0;\n  font-weight: 500;\n  color: red;\n  border: solid 1px red;\n  border-radius: 2px;\n  display: flex;\n}\n.error-message[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  padding: 12px 7px;\n}\n.error-message-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n.table-container[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 100%;\n  overflow-x: auto;\n}\n.mat-table[_ngcontent-%COMP%] {\n  min-width: 460px;\n}\n@media (max-width: 580px) {\n  .top-actions-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .top-actions-container[_ngcontent-%COMP%]   .mat-paginator[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .top-actions-container[_ngcontent-%COMP%]   .mat-paginator-outer-container[_ngcontent-%COMP%] {\n    align-items: flex-end;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHByZWRpY3Rpb25zLXRhYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0FBQ0o7QUFDSTtFQUNJLGdCQUFBO0FBQ1I7QUFHQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBQUo7QUFHQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtBQUFKO0FBR0E7RUFDSSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7QUFBSjtBQUlBO0VBQ0ksWUFBQTtFQUNBLGlCQUFBO0FBREo7QUFJQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0FBREo7QUFJQTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFESjtBQUlBO0VBQ0ksZ0JBQUE7QUFESjtBQUlBO0VBQ0k7SUFDSSxzQkFBQTtJQUNBLHVCQUFBO0VBRE47RUFHTTtJQUNJLFdBQUE7RUFEVjtFQUlNO0lBQ0kscUJBQUE7RUFGVjtBQUNGIiwiZmlsZSI6InByZWRpY3Rpb25zLXRhYmxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1vZGVscy1vdXRwdXQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcblxyXG4gICAgbWF0LWhlYWRlci1yb3cge1xyXG4gICAgICAgIG1pbi1oZWlnaHQ6IDQ4cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi50YWJsZS1zdHJ1Y3R1cmUge1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbn1cclxuXHJcbi50b3AtYWN0aW9ucy1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5lcnJvci1tZXNzYWdlLWNvbnRhaW5lciB7XHJcbiAgICBtYXJnaW46IDE1cHggMDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBjb2xvcjogcmVkO1xyXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmVkO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuXHJcbn1cclxuXHJcbi5lcnJvci1tZXNzYWdlIHtcclxuICAgIGZsZXgtZ3JvdzogMTtcclxuICAgIHBhZGRpbmc6IDEycHggN3B4O1xyXG59XHJcblxyXG4uZXJyb3ItbWVzc2FnZS1hY3Rpb25zIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbn1cclxuXHJcbi50YWJsZS1jb250YWluZXIge1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvdmVyZmxvdy14OiBhdXRvO1xyXG59XHJcblxyXG4ubWF0LXRhYmxlIHtcclxuICAgIG1pbi13aWR0aDogNDYwcHg7XHJcbn1cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6IDU4MHB4KSB7XHJcbiAgICAudG9wLWFjdGlvbnMtY29udGFpbmVyIHtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG5cclxuICAgICAgICAubWF0LXBhZ2luYXRvciB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLm1hdC1wYWdpbmF0b3Itb3V0ZXItY29udGFpbmVyIHtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PredictionsTableComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-predictions-table',
                templateUrl: './predictions-table.component.html',
                styleUrls: ['./predictions-table.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }, { type: _google_analytics_google_analytics_service__WEBPACK_IMPORTED_MODULE_3__["GoogleAnalyticsService"] }]; }, { dataHandling: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], download: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], model: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], predictionsData: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['predictions-data']
        }] }); })();


/***/ }),

/***/ "N4mv":
/*!****************************************************!*\
  !*** ./src/app/utilities/file-select.directive.ts ***!
  \****************************************************/
/*! exports provided: FileSelectDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileSelectDirective", function() { return FileSelectDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class FileSelectDirective {
    constructor(el) {
        this.el = el;
        this.selectedFile = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        this.addHiddenFileInput();
    }
    ngOnDestroy() {
        document.body.removeChild(this.fileInputElement);
    }
    addHiddenFileInput() {
        this.fileInputElement = document.createElement('INPUT');
        this.fileInputElement.setAttribute('type', 'file');
        this.fileInputElement.style.width = '0';
        this.fileInputElement.style.height = '0';
        this.fileInputElement.style.overflow = 'hidden';
        if (this.accept) {
            this.fileInputElement.setAttribute('accept', this.accept);
        }
        this.fileInputElement.onchange = (event) => {
            if (event.target.files && event.target.files.length > 0) {
                this.selectedFile.emit(event.target.files[event.target.files.length - 1]);
            }
            event.preventDefault();
        };
        document.body.appendChild(this.fileInputElement);
        const fileInputElement = this.fileInputElement;
        const clickFileInputElement = () => {
            fileInputElement.click();
        };
        this.el.nativeElement.addEventListener('click', clickFileInputElement);
    }
}
FileSelectDirective.ɵfac = function FileSelectDirective_Factory(t) { return new (t || FileSelectDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
FileSelectDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: FileSelectDirective, selectors: [["", "admeFileSelect", ""]], inputs: { accept: "accept" }, outputs: { selectedFile: "selectedFile" } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FileSelectDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[admeFileSelect]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { accept: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], selectedFile: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _utilities_deploy_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities/deploy-url */ "kUsB");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _google_analytics_google_analytics_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./google-analytics/google-analytics.service */ "c3Jj");
/* harmony import */ var _loading_loading_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./loading/loading.component */ "f/hT");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/menu */ "STbY");












class AppComponent {
    constructor(iconRegistry, sanitizer, router, gaService, 
    // tslint:disable-next-line:variable-name
    _document, deployUrl) {
        this.router = router;
        this.gaService = gaService;
        this._document = _document;
        this.deployUrl = deployUrl;
        iconRegistry.addSvgIcon('cancel', sanitizer.bypassSecurityTrustResourceUrl(`${deployUrl}assets/icons/cancel-24px.svg`));
    }
    ngOnInit() {
        this._document.getElementById('appFavicon').setAttribute('href', `${this.deployUrl}assets/icons/favicon.ico`);
        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["ResolveEnd"]) {
                this.gaService.sendPageView(event.state.root.firstChild.data.pageTitle, event.state.url);
            }
        });
    }
    ngOnDestroy() {
        if (this.routerSubscription != null) {
            this.routerSubscription.unsubscribe();
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconRegistry"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_google_analytics_google_analytics_service__WEBPACK_IMPORTED_MODULE_6__["GoogleAnalyticsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_3__["DEPLOY_URL"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["adme-root"]], decls: 23, vars: 1, consts: [["color", "primary"], ["routerLink", "/home", 1, "title"], [1, "navigation"], ["routerLink", "/predictions", 1, "nav-item"], [1, "nav-item", 3, "matMenuTriggerFor"], ["navMenu", "matMenu"], ["mat-menu-item", "", "routerLink", "/models/rlm"], ["mat-menu-item", "", "routerLink", "/models/pampa"], ["mat-menu-item", "", "routerLink", "/models/solubility"], ["mat-menu-item", "", "routerLink", "/models/cyp450"], ["routerLink", "/contact", 1, "nav-item"], [1, "fill-middle"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "adme-loading");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "ADME @ NCATS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Predict");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Models");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-menu", null, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "RLM");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "PAMPA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Solubility");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "CYP450");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Contact");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "router-outlet");
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r0);
    } }, directives: [_loading_loading_component__WEBPACK_IMPORTED_MODULE_7__["LoadingComponent"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbar"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenuTrigger"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenu"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenuItem"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: [".title[_ngcontent-%COMP%] {\n  font-size: 30px;\n  color: white;\n  text-decoration: none;\n}\n.title[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n.navigation[_ngcontent-%COMP%] {\n  margin-left: 20px;\n}\n.navigation[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  margin-right: 20px;\n  font-size: 14px;\n  transform: all 500ms;\n  color: white;\n  text-decoration: none;\n}\n.navigation[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n  text-decoration: underline;\n}\n.navigation[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:active {\n  text-decoration: underline;\n}\n@media (max-width: 490px) {\n  .mat-toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    padding-top: 5px;\n  }\n\n  .mat-toolbar-single-row[_ngcontent-%COMP%] {\n    height: auto;\n  }\n\n  .navigation[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-evenly;\n    margin-left: 0;\n    width: 100%;\n  }\n  .navigation[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n    margin-right: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtBQUNKO0FBQ0k7RUFDSSxlQUFBO0FBQ1I7QUFHQTtFQUNJLGlCQUFBO0FBQUo7QUFDSTtFQUNJLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0FBQ1I7QUFDUTtFQUNJLGVBQUE7RUFDQSwwQkFBQTtBQUNaO0FBRVE7RUFDSSwwQkFBQTtBQUFaO0FBS0E7RUFDSTtJQUNJLHNCQUFBO0lBQ0EsdUJBQUE7SUFDQSxnQkFBQTtFQUZOOztFQUtFO0lBQ0ksWUFBQTtFQUZOOztFQUtFO0lBQ0ksYUFBQTtJQUNBLDZCQUFBO0lBQ0EsY0FBQTtJQUNBLFdBQUE7RUFGTjtFQUdNO0lBQ0ksZUFBQTtFQURWO0FBQ0YiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5uYXZpZ2F0aW9uIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG4gICAgLm5hdi1pdGVtIHtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgIHRyYW5zZm9ybTogYWxsIDUwMG1zO1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcblxyXG4gICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJjphY3RpdmUge1xyXG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6IDQ5MHB4KSB7XHJcbiAgICAubWF0LXRvb2xiYXIge1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDVweDtcclxuICAgIH1cclxuXHJcbiAgICAubWF0LXRvb2xiYXItc2luZ2xlLXJvdyB7XHJcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgfVxyXG5cclxuICAgIC5uYXZpZ2F0aW9uIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIC5uYXYtaXRlbSB7XHJcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return [{ type: _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconRegistry"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _google_analytics_google_analytics_service__WEBPACK_IMPORTED_MODULE_6__["GoogleAnalyticsService"] }, { type: HTMLDocument, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_3__["DEPLOY_URL"]]
            }] }]; }, null); })();


/***/ }),

/***/ "TKh/":
/*!******************************************************!*\
  !*** ./src/app/predictions/predictions.component.ts ***!
  \******************************************************/
/*! exports provided: PredictionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PredictionsComponent", function() { return PredictionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _loading_loading_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loading/loading.service */ "/0B0");
/* harmony import */ var _google_analytics_google_analytics_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../google-analytics/google-analytics.service */ "c3Jj");
/* harmony import */ var _config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config/config.service */ "Cxl7");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _sketcher_sketcher_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sketcher/sketcher.component */ "oozq");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _text_file_text_file_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../text-file/text-file.component */ "5JNg");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _predictions_table_predictions_table_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../predictions-table/predictions-table.component */ "LToL");













function PredictionsComponent_div_6_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const message_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](message_r6);
} }
function PredictionsComponent_div_6_ul_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PredictionsComponent_div_6_ul_4_li_1_Template, 2, 1, "li", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4.errorMessages);
} }
function PredictionsComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PredictionsComponent_div_6_ul_4_Template, 2, 1, "ul", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PredictionsComponent_div_6_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.clearErrorMessage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.errorMessage, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.errorMessages && ctx_r0.errorMessages.length);
} }
function PredictionsComponent_div_7_mat_tab_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "adme-predictions-table", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("download", function PredictionsComponent_div_7_mat_tab_2_Template_adme_predictions_table_download_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r11.downloadCSV($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const model_r10 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", ctx_r9.tabLabels[model_r10]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("predictions-data", ctx_r9.sketcherData[model_r10])("model", model_r10);
} }
function PredictionsComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-tab-group", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedTabChange", function PredictionsComponent_div_7_Template_mat_tab_group_selectedTabChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.selectedTabChange($event, "predictions:model"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PredictionsComponent_div_7_mat_tab_2_Template, 3, 3, "mat-tab", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.models);
} }
function PredictionsComponent_div_11_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const message_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](message_r17);
} }
function PredictionsComponent_div_11_ul_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PredictionsComponent_div_11_ul_4_li_1_Template, 2, 1, "li", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r15.errorMessages);
} }
function PredictionsComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PredictionsComponent_div_11_ul_4_Template, 2, 1, "ul", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PredictionsComponent_div_11_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r18.clearErrorMessage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r2.errorMessage, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.errorMessages && ctx_r2.errorMessages.length);
} }
function PredictionsComponent_div_12_mat_tab_2_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "adme-predictions-table", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("download", function PredictionsComponent_div_12_mat_tab_2_Template_adme_predictions_table_download_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r22.downloadCSV($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const model_r21 = ctx.$implicit;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", ctx_r20.tabLabels[model_r21]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("predictions-data", ctx_r20.fileData[model_r21])("model", model_r21);
} }
function PredictionsComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-tab-group", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedTabChange", function PredictionsComponent_div_12_Template_mat_tab_group_selectedTabChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r24.selectedTabChange($event, "predictions:model"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PredictionsComponent_div_12_mat_tab_2_Template, 3, 3, "mat-tab", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.models);
} }
class PredictionsComponent {
    constructor(http, loadingService, gaService, configService) {
        this.http = http;
        this.loadingService = loadingService;
        this.gaService = gaService;
        this.configService = configService;
        this.sketcherDisplayedColumns = ['smiles', 'rlm'];
        this.errorMessages = [];
        this.columnSeparator = ',';
        this.lineBreak = '\n';
        this.sketcherIndexIdentifierColumn = 0;
        this.models = ['RLM', 'PAMPA', 'Solubility', 'CYP450'];
        this.tabLabels = {
            RLM: 'RLM Stability',
            PAMPA: 'PAMPA Permeability',
            Solubility: 'Solubility',
            CYP450: 'CYP450'
        };
        this.apiBaseUrl = configService.configData.apiBaseUrl;
    }
    ngOnInit() {
        this.link = document.createElement('a');
    }
    processSketcherInput(smiles) {
        this.gaService.sendEvent('click:button', 'predict', 'sketcher');
        this.clearErrorMessage();
        this.loadingService.setLoadingState(true);
        this.indexIdentifierColumn = this.sketcherIndexIdentifierColumn;
        const options = {
            params: {
                smiles,
                model: this.models
            }
        };
        this.http.get(`${this.apiBaseUrl}api/v1/predict`, options).subscribe((response) => {
            this.sketcherData = response;
            this.loadingService.setLoadingState(false);
        }, error => {
            this.errorMessage = 'There was an error processing your structure. Please modify it and try again.';
            this.loadingService.setLoadingState(false);
        });
    }
    processFile(fileForm) {
        this.gaService.sendEvent('click:button', 'predict', 'file');
        this.clearErrorMessage();
        this.loadingService.setLoadingState(true);
        const formData = new FormData();
        formData.append('lineBreak', fileForm.lineBreak);
        this.lineBreak = fileForm.lineBreak;
        formData.append('columnSeparator', fileForm.columnSeparator);
        this.columnSeparator = fileForm.columnSeparator;
        formData.append('hasHeaderRow', fileForm.hasHeaderRow.toString());
        formData.append('indexIdentifierColumn', fileForm.indexIdentifierColumn.toString());
        formData.append('models', this.models.join(';'));
        this.fileIndexIdentifierColumn = fileForm.indexIdentifierColumn;
        this.indexIdentifierColumn = this.fileIndexIdentifierColumn;
        formData.append('file', fileForm.file);
        this.http.post(`${this.apiBaseUrl}api/v1/predict-file`, formData).subscribe((response) => {
            if (response.hasErrors) {
                this.errorMessage = response.errorMessages;
            }
            else if (response && Object.keys(response).length > 0) {
                this.fileData = response;
            }
            this.loadingService.setLoadingState(false);
        }, error => {
            this.fileData = null;
            this.errorMessage = 'There was an error processing your file. Please make sure you have selected a file that contains SMILES, indicate if the file contains a header and the column number containing the SMILES.';
            this.loadingService.setLoadingState(false);
        });
    }
    clearErrorMessage() {
        this.errorMessage = '';
        this.errorMessages = [];
    }
    downloadCSV(event) {
        const dataKeys = [...event.allColumns].join(this.columnSeparator);
        const lines = [];
        event.data.forEach(data => lines.push(event.allColumns.map(key => data[key]).join(this.columnSeparator)));
        const csv = dataKeys + this.lineBreak + lines.join(this.lineBreak);
        this.file = new Blob([csv], { type: 'text/csv' });
        this.link.download = 'ADMEModelsPredictions.csv';
        this.downloadFile();
    }
    downloadFile() {
        // let url = window.URL.createObjectURL(this.file);
        this.link.href = window.URL.createObjectURL(this.file);
        this.link.click();
        // window.open(url);
    }
    selectedTabChange(event, category) {
        this.gaService.sendEvent('click:tab', category, event.tab.textLabel);
    }
}
PredictionsComponent.ɵfac = function PredictionsComponent_Factory(t) { return new (t || PredictionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_loading_loading_service__WEBPACK_IMPORTED_MODULE_2__["LoadingService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_google_analytics_google_analytics_service__WEBPACK_IMPORTED_MODULE_3__["GoogleAnalyticsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"])); };
PredictionsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PredictionsComponent, selectors: [["adme-predictions"]], decls: 13, vars: 4, consts: [[1, "content-container"], [1, "molecule-input"], [3, "selectedTabChange"], ["label", "Sketcher"], [1, "tab-body"], [3, "moleculeInput"], ["class", "error-message-container", 4, "ngIf"], [4, "ngIf"], ["label", "Text File"], [3, "fileProcess"], [1, "error-message-container"], [1, "error-message"], [1, "error-message-actions"], ["mat-button", "", "color", "primary", 3, "click"], ["aria-hidden", "false", "aria-label", "Close error message", "svgIcon", "cancel"], [4, "ngFor", "ngForOf"], [3, "label", 4, "ngFor", "ngForOf"], [3, "label"], ["dataHandling", "concat", 3, "predictions-data", "model", "download"], ["dataHandling", "replace", 3, "predictions-data", "model", "download"]], template: function PredictionsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-tab-group", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedTabChange", function PredictionsComponent_Template_mat_tab_group_selectedTabChange_2_listener($event) { return ctx.selectedTabChange($event, "predictions:input-type"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "adme-sketcher", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("moleculeInput", function PredictionsComponent_Template_adme_sketcher_moleculeInput_5_listener($event) { return ctx.processSketcherInput($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, PredictionsComponent_div_6_Template, 8, 2, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, PredictionsComponent_div_7_Template, 3, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-tab", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "adme-text-file", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("fileProcess", function PredictionsComponent_Template_adme_text_file_fileProcess_10_listener($event) { return ctx.processFile($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, PredictionsComponent_div_11_Template, 8, 2, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, PredictionsComponent_div_12_Template, 3, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.errorMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.sketcherData);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.errorMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.fileData);
    } }, directives: [_angular_material_tabs__WEBPACK_IMPORTED_MODULE_5__["MatTabGroup"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_5__["MatTab"], _sketcher_sketcher_component__WEBPACK_IMPORTED_MODULE_6__["SketcherComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _text_file_text_file_component__WEBPACK_IMPORTED_MODULE_8__["TextFileComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _predictions_table_predictions_table_component__WEBPACK_IMPORTED_MODULE_11__["PredictionsTableComponent"]], styles: [".content-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 10px 20px;\n}\n\n.mat-tab-group[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.tab-body[_ngcontent-%COMP%] {\n  padding-top: 15px;\n  max-width: 100%;\n  width: 100%;\n  overflow: auto;\n  padding-bottom: 10px;\n}\n\n.molecule-input[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  max-width: 100%;\n}\n\n.molecule-input[_ngcontent-%COMP%]   .mat-tab-header[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.error-message-container[_ngcontent-%COMP%] {\n  margin: 15px 0;\n  font-weight: 500;\n  color: red;\n  border: solid 1px red;\n  border-radius: 2px;\n  display: flex;\n}\n\n.error-message[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  padding: 12px 7px;\n}\n\n.error-message-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHByZWRpY3Rpb25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7QUFDSjs7QUFFQTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7QUFDSjs7QUFFQTtFQUNJLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQUNKOztBQUNJO0VBQ0ksbUJBQUE7QUFDUjs7QUFLQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQUZKOztBQU1BO0VBQ0ksWUFBQTtFQUNBLGlCQUFBO0FBSEo7O0FBTUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtBQUhKIiwiZmlsZSI6InByZWRpY3Rpb25zLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG59XHJcblxyXG4ubWF0LXRhYi1ncm91cCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLnRhYi1ib2R5IHtcclxuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4ubW9sZWN1bGUtaW5wdXQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG5cclxuICAgIC5tYXQtdGFiLWhlYWRlciB7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgICAgfVxyXG59XHJcblxyXG5cclxuXHJcbi5lcnJvci1tZXNzYWdlLWNvbnRhaW5lciB7XHJcbiAgICBtYXJnaW46IDE1cHggMDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBjb2xvcjogcmVkO1xyXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmVkO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuXHJcbn1cclxuXHJcbi5lcnJvci1tZXNzYWdlIHtcclxuICAgIGZsZXgtZ3JvdzogMTtcclxuICAgIHBhZGRpbmc6IDEycHggN3B4O1xyXG59XHJcblxyXG4uZXJyb3ItbWVzc2FnZS1hY3Rpb25zIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PredictionsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-predictions',
                templateUrl: './predictions.component.html',
                styleUrls: ['./predictions.component.scss']
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _loading_loading_service__WEBPACK_IMPORTED_MODULE_2__["LoadingService"] }, { type: _google_analytics_google_analytics_service__WEBPACK_IMPORTED_MODULE_3__["GoogleAnalyticsService"] }, { type: _config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] }]; }, null); })();


/***/ }),

/***/ "XbtY":
/*!******************************************!*\
  !*** ./src/app/config/config.factory.ts ***!
  \******************************************/
/*! exports provided: configServiceFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configServiceFactory", function() { return configServiceFactory; });
// tslint:disable-next-line:ban-types
function configServiceFactory(startupService) {
    return () => startupService.load();
}


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home/home.component */ "9vUh");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _sketcher_sketcher_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sketcher/sketcher.module */ "H/QM");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _predictions_predictions_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./predictions/predictions.component */ "TKh/");
/* harmony import */ var _method_method_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./method/method.component */ "HfCQ");
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "rQPh");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _utilities_file_select_directive__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utilities/file-select.directive */ "N4mv");
/* harmony import */ var _text_file_text_file_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./text-file/text-file.component */ "5JNg");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _loading_loading_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./loading/loading.component */ "f/hT");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _structure_image_structure_image_directive__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./structure-image/structure-image.directive */ "wgkH");
/* harmony import */ var _structure_image_dialog_structure_image_dialog_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./structure-image-dialog/structure-image-dialog.component */ "qN8M");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/sort */ "Dh3D");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./contact/contact.component */ "bzTf");
/* harmony import */ var _predictions_table_predictions_table_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./predictions-table/predictions-table.component */ "LToL");
/* harmony import */ var _config_config_service__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./config/config.service */ "Cxl7");
/* harmony import */ var _config_config_factory__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./config/config.factory */ "XbtY");
/* harmony import */ var _google_analytics_track_link_event_track_link_event_directive__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./google-analytics/track-link-event/track-link-event.directive */ "/cuJ");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/common */ "ofXK");








































class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        _config_config_service__WEBPACK_IMPORTED_MODULE_34__["ConfigService"],
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"],
            useFactory: _config_config_factory__WEBPACK_IMPORTED_MODULE_35__["configServiceFactory"],
            deps: [_config_config_service__WEBPACK_IMPORTED_MODULE_34__["ConfigService"]],
            multi: true
        },
        {
            provide: _angular_common__WEBPACK_IMPORTED_MODULE_38__["APP_BASE_HREF"],
            useFactory: (s) => s.getBaseHrefFromDOM(),
            deps: [_angular_common__WEBPACK_IMPORTED_MODULE_38__["PlatformLocation"]]
        }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
            _sketcher_sketcher_module__WEBPACK_IMPORTED_MODULE_6__["SketcherModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_14__["MatToolbarModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ReactiveFormsModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatFormFieldModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_19__["MatSelectModule"],
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_20__["MatTabsModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_21__["MatInputModule"],
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_22__["MatProgressBarModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_23__["MatProgressSpinnerModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_25__["MatListModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_28__["MatDialogModule"],
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_29__["MatSortModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_30__["MatTooltipModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_31__["MatIconModule"],
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_37__["MatMenuModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"],
        _predictions_predictions_component__WEBPACK_IMPORTED_MODULE_11__["PredictionsComponent"],
        _method_method_component__WEBPACK_IMPORTED_MODULE_12__["MethodComponent"],
        _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_13__["PageNotFoundComponent"],
        _utilities_file_select_directive__WEBPACK_IMPORTED_MODULE_15__["FileSelectDirective"],
        _text_file_text_file_component__WEBPACK_IMPORTED_MODULE_16__["TextFileComponent"],
        _loading_loading_component__WEBPACK_IMPORTED_MODULE_24__["LoadingComponent"],
        _structure_image_structure_image_directive__WEBPACK_IMPORTED_MODULE_26__["StructureImageDirective"],
        _structure_image_dialog_structure_image_dialog_component__WEBPACK_IMPORTED_MODULE_27__["StructureImageDialogComponent"],
        _contact_contact_component__WEBPACK_IMPORTED_MODULE_32__["ContactComponent"],
        _predictions_table_predictions_table_component__WEBPACK_IMPORTED_MODULE_33__["PredictionsTableComponent"],
        _google_analytics_track_link_event_track_link_event_directive__WEBPACK_IMPORTED_MODULE_36__["TrackLinkEventDirective"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
        _sketcher_sketcher_module__WEBPACK_IMPORTED_MODULE_6__["SketcherModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_14__["MatToolbarModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ReactiveFormsModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatFormFieldModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_19__["MatSelectModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_20__["MatTabsModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_21__["MatInputModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_22__["MatProgressBarModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_23__["MatProgressSpinnerModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_25__["MatListModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_28__["MatDialogModule"],
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_29__["MatSortModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_30__["MatTooltipModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_31__["MatIconModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_37__["MatMenuModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"],
                    _predictions_predictions_component__WEBPACK_IMPORTED_MODULE_11__["PredictionsComponent"],
                    _method_method_component__WEBPACK_IMPORTED_MODULE_12__["MethodComponent"],
                    _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_13__["PageNotFoundComponent"],
                    _utilities_file_select_directive__WEBPACK_IMPORTED_MODULE_15__["FileSelectDirective"],
                    _text_file_text_file_component__WEBPACK_IMPORTED_MODULE_16__["TextFileComponent"],
                    _loading_loading_component__WEBPACK_IMPORTED_MODULE_24__["LoadingComponent"],
                    _structure_image_structure_image_directive__WEBPACK_IMPORTED_MODULE_26__["StructureImageDirective"],
                    _structure_image_dialog_structure_image_dialog_component__WEBPACK_IMPORTED_MODULE_27__["StructureImageDialogComponent"],
                    _contact_contact_component__WEBPACK_IMPORTED_MODULE_32__["ContactComponent"],
                    _predictions_table_predictions_table_component__WEBPACK_IMPORTED_MODULE_33__["PredictionsTableComponent"],
                    _google_analytics_track_link_event_track_link_event_directive__WEBPACK_IMPORTED_MODULE_36__["TrackLinkEventDirective"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                    _sketcher_sketcher_module__WEBPACK_IMPORTED_MODULE_6__["SketcherModule"],
                    _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
                    _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_14__["MatToolbarModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ReactiveFormsModule"],
                    _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatFormFieldModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_19__["MatSelectModule"],
                    _angular_material_tabs__WEBPACK_IMPORTED_MODULE_20__["MatTabsModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_21__["MatInputModule"],
                    _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_22__["MatProgressBarModule"],
                    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_23__["MatProgressSpinnerModule"],
                    _angular_material_list__WEBPACK_IMPORTED_MODULE_25__["MatListModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_28__["MatDialogModule"],
                    _angular_material_sort__WEBPACK_IMPORTED_MODULE_29__["MatSortModule"],
                    _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_30__["MatTooltipModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_31__["MatIconModule"],
                    _angular_material_menu__WEBPACK_IMPORTED_MODULE_37__["MatMenuModule"]
                ],
                entryComponents: [
                    _structure_image_dialog_structure_image_dialog_component__WEBPACK_IMPORTED_MODULE_27__["StructureImageDialogComponent"]
                ],
                providers: [
                    _config_config_service__WEBPACK_IMPORTED_MODULE_34__["ConfigService"],
                    {
                        provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"],
                        useFactory: _config_config_factory__WEBPACK_IMPORTED_MODULE_35__["configServiceFactory"],
                        deps: [_config_config_service__WEBPACK_IMPORTED_MODULE_34__["ConfigService"]],
                        multi: true
                    },
                    {
                        provide: _angular_common__WEBPACK_IMPORTED_MODULE_38__["APP_BASE_HREF"],
                        useFactory: (s) => s.getBaseHrefFromDOM(),
                        deps: [_angular_common__WEBPACK_IMPORTED_MODULE_38__["PlatformLocation"]]
                    }
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "bzTf":
/*!**********************************************!*\
  !*** ./src/app/contact/contact.component.ts ***!
  \**********************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/deploy-url */ "kUsB");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




class ContactComponent {
    constructor(domSanatizer, deployUrl) {
        this.domSanatizer = domSanatizer;
        this.deployUrl = deployUrl;
        this.vishalImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/siramshettyv2.jpg`);
        this.pranavImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/shahpa2.png`);
        this.jorgeImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/neyraj2.jpg`);
        this.jordanImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/williamsjos.jpg`);
        this.noelImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/southalln.jpg`);
        this.trungImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/nguyenda.png`);
        this.xinImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/profile_images/xux7.jpg`);
        this.rdkitImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/rdkit.png`);
        this.pythonImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/python.png`);
        this.angularImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/angular.png`);
        this.epamImgSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${this.deployUrl}assets/images/epam_ketcher.png`);
    }
    ngOnInit() {
    }
}
ContactComponent.ɵfac = function ContactComponent_Factory(t) { return new (t || ContactComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__["DEPLOY_URL"])); };
ContactComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContactComponent, selectors: [["adme-contact"]], decls: 108, vars: 11, consts: [[1, "container"], [1, "inner-container"], [1, "profiles-row"], [1, "profile-image-container"], [3, "src"], [1, "profile-info-container"], ["href", "mailto: siramshettyv2@nih.gov"], ["href", "mailto: pranav.shah@nih.gov"], ["href", "mailto: jorge.neyra@nih.gov"], ["href", "mailto: jordan.williams2@nih.gov"], ["href", "mailto: southalln@mail.nih.gov"], ["href", "mailto: nguyenda@mail.nih.gov"], ["href", "mailto: xin.xu3@nih.gov"], [1, "resources-container"], [1, "resources-row"], ["href", "https://www.rdkit.org/", "target", "_blank"], ["href", "https://www.python.org/", "target", "_blank"], ["href", "https://angular.io/", "target", "_blank"], ["href", "https://lifescience.opensource.epam.com/ketcher/index.html", "target", "_blank"]], template: function ContactComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Contact ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Vishal Siramshetty ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Postdoctoral Fellow (Informatics) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Email: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "siramshettyv2@nih.gov");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " (models/predictions related queries) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Pranav Shah ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " Lead (In Vitro ADME) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, " Email: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "pranav.shah@nih.gov");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, " (assay/data related queries) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, " Jorge Neyra ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, " Software Developer (Informatics) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " Email: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "jorge.neyra@nih.gov");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, " (software related queries) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, " Jordan Williams ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, " Postbaccalaureate Fellow (In Vitro ADME) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, " Email: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "jordan.williams2@nih.gov");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, " Noel Southall ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, " Lead (Informatics) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, " Email: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "southalln@mail.nih.gov");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, " Trung Nguyen ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, " Staff Scientist (Informatics) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, " Email: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, "nguyenda@mail.nih.gov");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](81, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, " Xin Xu ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, " Lead (ADME Group) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](88, " Email: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, "xin.xu3@nih.gov");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, " Resources ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "a", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](97, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](100, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](107, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.vishalImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.pranavImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.jorgeImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.jordanImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.noelImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.trungImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.xinImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.rdkitImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.pythonImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.angularImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.epamImgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, styles: ["h1[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-bottom: 40px;\n  font-size: 28px;\n}\n\n.profiles-row[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.profiles-row[_ngcontent-%COMP%]:not(:last-child) {\n  margin-bottom: 10px;\n}\n\n.profile-image-container[_ngcontent-%COMP%] {\n  width: 115px;\n  max-width: 115px;\n  min-width: 115px;\n}\n\n.profile-image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n}\n\n.profile-info-container[_ngcontent-%COMP%] {\n  padding-left: 25px;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.profile-info-container[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:not(:last-child) {\n  margin-bottom: 3px;\n}\n\n.resources-container[_ngcontent-%COMP%] {\n  padding-top: 40px;\n}\n\n.resources-row[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 40px;\n}\n\n.resources-row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  width: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.resources-row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  padding-right: 7px;\n}\n\n.resources-row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child {\n  padding-left: 7px;\n}\n\n.resources-row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: auto;\n  width: 80%;\n  max-width: 100%;\n}\n\n@media (max-width: 400px) {\n  .profile-image-container[_ngcontent-%COMP%] {\n    width: 105px;\n    max-width: 105px;\n    min-width: 105px;\n  }\n\n  .profile-info-container[_ngcontent-%COMP%] {\n    padding-left: 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGNvbnRhY3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQUNKOztBQUVBO0VBQ0ksYUFBQTtBQUNKOztBQUNJO0VBQ0ksbUJBQUE7QUFDUjs7QUFHQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBQUo7O0FBRUk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUFSOztBQUlBO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7QUFESjs7QUFHSTtFQUNJLGtCQUFBO0FBRFI7O0FBS0E7RUFDSSxpQkFBQTtBQUZKOztBQUtBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBRko7O0FBSUk7RUFDSSxVQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFGUjs7QUFJUTtFQUNJLGtCQUFBO0FBRlo7O0FBS1E7RUFDSSxpQkFBQTtBQUhaOztBQU1RO0VBQ0ksWUFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0FBSlo7O0FBU0E7RUFFSTtJQUNJLFlBQUE7SUFDQSxnQkFBQTtJQUNBLGdCQUFBO0VBUE47O0VBVUU7SUFDSSxrQkFBQTtFQVBOO0FBQ0YiLCJmaWxlIjoiY29udGFjdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImgxIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxuICAgIGZvbnQtc2l6ZTogMjhweDtcclxufVxyXG5cclxuLnByb2ZpbGVzLXJvdyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG5cclxuICAgICY6bm90KDpsYXN0LWNoaWxkKSB7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIH1cclxufVxyXG5cclxuLnByb2ZpbGUtaW1hZ2UtY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMTVweDtcclxuICAgIG1heC13aWR0aDogMTE1cHg7XHJcbiAgICBtaW4td2lkdGg6IDExNXB4O1xyXG5cclxuICAgIGltZyB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgfVxyXG59XHJcblxyXG4ucHJvZmlsZS1pbmZvLWNvbnRhaW5lciB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDI1cHg7XHJcbiAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cclxuICAgICYgPiBkaXY6bm90KDpsYXN0LWNoaWxkKSB7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogM3B4O1xyXG4gICAgfVxyXG59XHJcblxyXG4ucmVzb3VyY2VzLWNvbnRhaW5lciB7XHJcbiAgICBwYWRkaW5nLXRvcDogNDBweDtcclxufVxyXG5cclxuLnJlc291cmNlcy1yb3cge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcblxyXG4gICAgJiA+IGRpdiB7XHJcbiAgICAgICAgd2lkdGg6IDUwJTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgICAgICY6Zmlyc3QtY2hpbGQge1xyXG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA3cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDdweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGltZyB7XHJcbiAgICAgICAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgICAgICAgd2lkdGg6IDgwJTtcclxuICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhKG1heC13aWR0aDogNDAwcHgpIHtcclxuXHJcbiAgICAucHJvZmlsZS1pbWFnZS1jb250YWluZXIge1xyXG4gICAgICAgIHdpZHRoOiAxMDVweDtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwNXB4O1xyXG4gICAgICAgIG1pbi13aWR0aDogMTA1cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnByb2ZpbGUtaW5mby1jb250YWluZXIge1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIH1cclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ContactComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-contact',
                templateUrl: './contact.component.html',
                styleUrls: ['./contact.component.scss']
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__["DEPLOY_URL"]]
            }] }]; }, null); })();


/***/ }),

/***/ "c3Jj":
/*!**************************************************************!*\
  !*** ./src/app/google-analytics/google-analytics.service.ts ***!
  \**************************************************************/
/*! exports provided: GoogleAnalyticsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleAnalyticsService", function() { return GoogleAnalyticsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _config_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/config.service */ "Cxl7");




// tslint:disable:no-string-literal
class GoogleAnalyticsService {
    constructor(configService, 
    // tslint:disable-next-line:ban-types
    platformId) {
        this.configService = configService;
        this.platformId = platformId;
        this.isActive = false;
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(this.platformId)
            && configService.configData
            && configService.configData.googleAnalyticsId) {
            this.googleAnanlyticsId = configService.configData.googleAnalyticsId;
            this.init();
        }
    }
    init() {
        this.gtag = window['gtag'];
        this.gtag('config', 'G-RM2JHGHYEK', { send_page_view: false });
        this.isActive = true;
    }
    onGlobalError(event) {
        const errorDescription = `message: ${event.message} | filenname: ${event.filename} | lineno: ${event.lineno} | colno: ${event.colno}`;
        this.sendException(errorDescription);
    }
    sendPageView(title, path = location.href) {
        if (this.isActive) {
            const sendFields = {
                page_title: title,
                page_path: path
            };
            console.log(this.gtag);
            this.gtag('config', this.googleAnanlyticsId, sendFields);
        }
    }
    sendEvent(eventAction, eventCategory, eventLabel, eventValue) {
        if (this.isActive) {
            const sendFields = {
                event_category: eventCategory,
                event_label: eventLabel,
                value: eventValue
            };
            this.gtag('event', eventAction, sendFields);
        }
    }
    sendException(exDescription, exFatal = false) {
        if (this.isActive) {
            const sendFields = {
                description: exDescription,
                fatal: exFatal
            };
            this.gtag('event', 'exception', sendFields);
        }
    }
}
GoogleAnalyticsService.ɵfac = function GoogleAnalyticsService_Factory(t) { return new (t || GoogleAnalyticsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_config_config_service__WEBPACK_IMPORTED_MODULE_2__["ConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"])); };
GoogleAnalyticsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GoogleAnalyticsService, factory: GoogleAnalyticsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GoogleAnalyticsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _config_config_service__WEBPACK_IMPORTED_MODULE_2__["ConfigService"] }, { type: Object, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"]]
            }] }]; }, { onGlobalError: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['window:error', ['$event']]
        }] }); })();


/***/ }),

/***/ "f/hT":
/*!**********************************************!*\
  !*** ./src/app/loading/loading.component.ts ***!
  \**********************************************/
/*! exports provided: LoadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingComponent", function() { return LoadingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _loading_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loading.service */ "/0B0");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");





function LoadingComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class LoadingComponent {
    constructor(lodadingService) {
        this.lodadingService = lodadingService;
        this.isLoading = false;
    }
    ngOnInit() {
        this.lodadingService.isLoading.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
    }
}
LoadingComponent.ɵfac = function LoadingComponent_Factory(t) { return new (t || LoadingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_loading_service__WEBPACK_IMPORTED_MODULE_1__["LoadingService"])); };
LoadingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoadingComponent, selectors: [["adme-loading"]], decls: 1, vars: 1, consts: [["class", "progress-bar-container", 4, "ngIf"], [1, "progress-bar-container"]], template: function LoadingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, LoadingComponent_div_0_Template, 2, 0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isLoading);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__["MatSpinner"]], styles: [".progress-bar-container[_ngcontent-%COMP%] {\n  z-index: 1001;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  align-content: center;\n  justify-content: center;\n  background-color: rgba(255, 255, 255, 0.8);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGxvYWRpbmcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLHVCQUFBO0VBQ0EsMENBQUE7QUFDSiIsImZpbGUiOiJsb2FkaW5nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2dyZXNzLWJhci1jb250YWluZXIge1xyXG4gICAgei1pbmRleDogMTAwMTtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIC44KTtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadingComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-loading',
                templateUrl: './loading.component.html',
                styleUrls: ['./loading.component.scss']
            }]
    }], function () { return [{ type: _loading_service__WEBPACK_IMPORTED_MODULE_1__["LoadingService"] }]; }, null); })();


/***/ }),

/***/ "kUsB":
/*!*****************************************!*\
  !*** ./src/app/utilities/deploy-url.ts ***!
  \*****************************************/
/*! exports provided: DEPLOY_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEPLOY_URL", function() { return DEPLOY_URL; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
// this is a hack to access deploy-url taken from:
// tslint:disable-next-line:comment-format
// https://stackoverflow.com/questions/47885451/angular-cli-build-using-base-href-and-deploy-url-to-access-assets-on-cdn
// while this issues is still outstanding:
// https://github.com/angular/angular-cli/issues/6666

const DEPLOY_URL = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('deployUrl');


/***/ }),

/***/ "oozq":
/*!************************************************!*\
  !*** ./src/app/sketcher/sketcher.component.ts ***!
  \************************************************/
/*! exports provided: SketcherComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SketcherComponent", function() { return SketcherComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/deploy-url */ "kUsB");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _loading_loading_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../loading/loading.service */ "/0B0");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");






const _c0 = ["ketcherFrame"];
class SketcherComponent {
    constructor(domSanatizer, loadingService, deployUrl) {
        this.domSanatizer = domSanatizer;
        this.loadingService = loadingService;
        this.deployUrl = deployUrl;
        this.moleculeInput = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.ketcherSrc = domSanatizer.bypassSecurityTrustResourceUrl(`${deployUrl}assets/ketcher/ketcher.html`);
    }
    ngOnInit() {
        // this.loadingService.setLoadingState(true);
        this.ketcherFrame.nativeElement.onload = () => {
            // tslint:disable-next-line:no-string-literal
            this.ketcher = this.ketcherFrame.nativeElement.contentWindow['ketcher'];
            this.loadingService.setLoadingState(false);
        };
    }
    addMolecule() {
        const smiles = this.ketcher.getSmiles();
        this.moleculeInput.emit(smiles);
    }
}
SketcherComponent.ɵfac = function SketcherComponent_Factory(t) { return new (t || SketcherComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_loading_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__["DEPLOY_URL"])); };
SketcherComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SketcherComponent, selectors: [["adme-sketcher"]], viewQuery: function SketcherComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.ketcherFrame = _t.first);
    } }, outputs: { moleculeInput: "moleculeInput" }, decls: 6, vars: 1, consts: [[1, "sketcher-container"], ["id", "ketcherFrame", "id", "ketcher-frame", "scrolling", "no", 3, "src"], ["ketcherFrame", ""], [1, "actions"], ["mat-raised-button", "", "color", "accent", 3, "click"]], template: function SketcherComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "iframe", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SketcherComponent_Template_button_click_4_listener() { return ctx.addMolecule(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Predict ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.ketcherSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeResourceUrl"]);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"]], styles: ["[_nghost-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.actions[_ngcontent-%COMP%] {\n  padding-top: 15px;\n}\n\niframe[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 640px;\n  border: none;\n  min-height: 430px;\n}\n\n.sketcher-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 100%;\n  overflow-x: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHNrZXRjaGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQUNKOztBQUVBO0VBQ0ksaUJBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQUNKIiwiZmlsZSI6InNrZXRjaGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5hY3Rpb25zIHtcclxuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xyXG59XHJcblxyXG5pZnJhbWUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtaW4td2lkdGg6IDY0MHB4O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgbWluLWhlaWdodDogNDMwcHg7XHJcbn1cclxuXHJcbi5za2V0Y2hlci1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBvdmVyZmxvdy14OiBhdXRvO1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SketcherComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-sketcher',
                templateUrl: './sketcher.component.html',
                styleUrls: ['./sketcher.component.scss']
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }, { type: _loading_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__["DEPLOY_URL"]]
            }] }]; }, { ketcherFrame: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['ketcherFrame', { static: true }]
        }], moleculeInput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "qN8M":
/*!****************************************************************************!*\
  !*** ./src/app/structure-image-dialog/structure-image-dialog.component.ts ***!
  \****************************************************************************/
/*! exports provided: StructureImageDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructureImageDialogComponent", function() { return StructureImageDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _structure_image_structure_image_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../structure-image/structure-image.directive */ "wgkH");




class StructureImageDialogComponent {
    constructor(data) {
        this.data = data;
        this.smiles = data.smiles;
    }
    ngOnInit() {
    }
}
StructureImageDialogComponent.ɵfac = function StructureImageDialogComponent_Factory(t) { return new (t || StructureImageDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
StructureImageDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StructureImageDialogComponent, selectors: [["adme-structure-image-dialog"]], decls: 1, vars: 1, consts: [["admeStructureImage", "", 3, "entityId"]], template: function StructureImageDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("entityId", ctx.smiles);
    } }, directives: [_structure_image_structure_image_directive__WEBPACK_IMPORTED_MODULE_2__["StructureImageDirective"]], styles: ["img[_ngcontent-%COMP%] {\n  height: 60vh;\n  width: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN0cnVjdHVyZS1pbWFnZS1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBQ0EsV0FBQTtBQUNKIiwiZmlsZSI6InN0cnVjdHVyZS1pbWFnZS1kaWFsb2cuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpbWcge1xyXG4gICAgaGVpZ2h0OiA2MHZoO1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StructureImageDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-structure-image-dialog',
                templateUrl: './structure-image-dialog.component.html',
                styleUrls: ['./structure-image-dialog.component.scss']
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "rQPh":
/*!************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.ts ***!
  \************************************************************/
/*! exports provided: PageNotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function() { return PageNotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PageNotFoundComponent {
    constructor() { }
    ngOnInit() {
    }
}
PageNotFoundComponent.ɵfac = function PageNotFoundComponent_Factory(t) { return new (t || PageNotFoundComponent)(); };
PageNotFoundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PageNotFoundComponent, selectors: [["adme-page-not-found"]], decls: 2, vars: 0, template: function PageNotFoundComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "page-not-found works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYWdlLW5vdC1mb3VuZC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PageNotFoundComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'adme-page-not-found',
                templateUrl: './page-not-found.component.html',
                styleUrls: ['./page-not-found.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "9vUh");
/* harmony import */ var _predictions_predictions_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./predictions/predictions.component */ "TKh/");
/* harmony import */ var _method_method_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./method/method.component */ "HfCQ");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contact/contact.component */ "bzTf");








const routes = [
    {
        path: 'home',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"],
        data: {
            pageTitle: 'home'
        }
    },
    {
        path: 'predictions',
        component: _predictions_predictions_component__WEBPACK_IMPORTED_MODULE_3__["PredictionsComponent"],
        data: {
            pageTitle: 'predictions'
        }
    },
    {
        path: 'models/:model',
        component: _method_method_component__WEBPACK_IMPORTED_MODULE_4__["MethodComponent"],
        data: {
            pageTitle: 'model'
        }
    },
    {
        path: 'contact',
        component: _contact_contact_component__WEBPACK_IMPORTED_MODULE_5__["ContactComponent"],
        data: {
            pageTitle: 'contact'
        }
    },
    {
        path: '**',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { relativeLinkResolution: 'legacy' })], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { relativeLinkResolution: 'legacy' })],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "wgkH":
/*!**************************************************************!*\
  !*** ./src/app/structure-image/structure-image.directive.ts ***!
  \**************************************************************/
/*! exports provided: StructureImageDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructureImageDirective", function() { return StructureImageDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _config_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/config.service */ "Cxl7");




class StructureImageDirective {
    constructor(el, http, configService) {
        this.el = el;
        this.http = http;
        this.configService = configService;
        this.privateStereo = false;
        this.isAfterViewInit = false;
        this.imageElement = this.el.nativeElement;
        this.apiBaseUrl = configService.configData.apiBaseUrl;
    }
    ngAfterViewInit() {
        this.isAfterViewInit = true;
        this.setImageSrc();
    }
    set version(version) {
        if (version !== this.privateVersion) {
            this.privateVersion = version;
            this.setImageSrc();
        }
    }
    set entityId(entityId) {
        if (entityId !== this.privateEntityId) {
            this.privateEntityId = entityId;
            this.setImageSrc();
        }
    }
    set size(size) {
        if (size !== this.privateSize) {
            this.privateSize = size;
            this.setImageSrc();
        }
    }
    set stereo(showStereo) {
        if (showStereo !== this.privateStereo) {
            this.privateStereo = showStereo;
            this.setImageSrc();
        }
    }
    set atomMaps(atomMaps) {
        if (atomMaps !== this.privateAtomMaps) {
            this.privateAtomMaps = atomMaps;
            this.setImageSrc();
        }
    }
    setImageSrc() {
        if (this.isAfterViewInit) {
            const srcUrl = `${this.apiBaseUrl}api/v1/structure_image/${encodeURIComponent(this.privateEntityId)}`;
            this.imageElement.src = srcUrl;
            this.imageElement.alt = 'structure image';
        }
    }
}
StructureImageDirective.ɵfac = function StructureImageDirective_Factory(t) { return new (t || StructureImageDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_config_config_service__WEBPACK_IMPORTED_MODULE_2__["ConfigService"])); };
StructureImageDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: StructureImageDirective, selectors: [["", "admeStructureImage", ""]], inputs: { version: "version", entityId: "entityId", size: "size", stereo: "stereo", atomMaps: "atomMaps" } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StructureImageDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[admeStructureImage]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _config_config_service__WEBPACK_IMPORTED_MODULE_2__["ConfigService"] }]; }, { version: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], entityId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], size: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], stereo: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], atomMaps: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/utilities/deploy-url */ "kUsB");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
const deployUrl = (() => {
    const scripts = document.getElementsByTagName('script');
    const index = scripts.length - 1;
    const mainScript = scripts[index];
    return mainScript.src.replace(/main.*?\.js$/, '');
})();
const DEPLOY_URL_PROVIDER = {
    provide: _app_utilities_deploy_url__WEBPACK_IMPORTED_MODULE_1__["DEPLOY_URL"],
    useValue: deployUrl,
};
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["platformBrowser"]([DEPLOY_URL_PROVIDER]).bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map