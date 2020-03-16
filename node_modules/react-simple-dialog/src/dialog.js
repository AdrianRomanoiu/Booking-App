import React, { PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

import styles from './index.less';

export default class Dialog extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			visible: false,

			config: {
				type: props.type || 'confirm',
				title: 'tip',
				tip: '',
			},

			okfunc: null,
			cancelfunc: null
		}
	}

	show({config, data, okfunc, cancelfunc}){
		this.setState({
			visible: true,
			config: config,
			okfunc: okfunc,
			cancelfunc: cancelfunc
		})
	}

	hide(data){
		this.setState({
			visible: false
		})
	}

	okfunc(){
		if (this.state.okfunc) {
			this.state.okfunc.apply(this);
		}
		this.hide();
	}

	cancelfunc(){
		if (this.state.cancelfunc) {
			this.state.cancelfunc.apply(this);
		}
		this.hide();
	}

  	render(){
    	return  <div>
    			{this.state.visible && <div>
    			<div className={styles.mask}></div>
    			<div className={styles.dialog}>
					<div className={styles.header}><span className={styles.title}>{this.state.config.title}</span> <span onClick={this.cancelfunc.bind(this)}  className={styles.close}>x</span></div>
		      		<div className={styles.content}>
				        {this.state.config.tip}
					    {(!this.state.config.type || this.state.config.type== 'confirm') && <div className={styles.buttonarea}>
					    	<button type="button" onClick={this.okfunc.bind(this, this.state.data)} className={styles.btn + ' ' + styles.btnprimary} style={{marginRight: '5px'}}>确定</button>
					    	<button type="button" onClick={this.cancelfunc.bind(this)} className={styles.btn}>取消</button>
					    </div>}
					    {this.state.config.type == 'error' && <div className={styles.buttonarea}>
					    	<button type="button" onClick={this.okfunc.bind(this, this.state.data)} className={styles.btn + ' ' + styles.btnprimary} style={{marginRight: '5px'}}>确定</button>
					    </div>}
					    {this.state.config.type == 'success' && <div className={styles.buttonarea}>
					    	<button type="button" onClick={this.okfunc.bind(this, this.state.data)} className={styles.btn + ' ' + styles.btnprimary} style={{marginRight: '5px'}}>确定</button>
					    </div>}
					</div>
		    	</div></div>}
		    	</div>
  	}
}