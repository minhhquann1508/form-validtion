import React, { Component } from 'react';
import { connect } from 'react-redux';
class Form extends Component {
    constructor(props) {
        super()
        this.state = {
            values: {
                maSV: '',
                hoTen: '',
                soDT: '',
                email: '',
            },
            errors: {
                maSV: '',
                hoTen: '',
                soDT: '',
                email: '',
            },
        }
    }
    handleOnchange = (e) => {
        const { name, value } = e.target;
        let values = { ...this.state.values, [name]: value };
        let errors = { ...this.state.errors };
        if (value.trim() === '') {
            errors[name] = `${name} không bỏ trống`
        }
        this.setState({
            ...this.state,
            values,
            errors
        })
    }
    handleOnSubmit = (e) => {
        e.preventDefault();
        const allValuesFilled = Object.values(this.state.values).every((value) => value !== '');
        const allErrorsFilled = Object.values(this.state.errors).every((error) => error === '');
        if (allValuesFilled && allErrorsFilled) {
            this.props.submitUser(this.state.values);
            this.setState({
                values: {
                    maSV: '',
                    hoTen: '',
                    soDT: '',
                    email: '',
                },
                errors: {
                    maSV: '',
                    hoTen: '',
                    soDT: '',
                    email: '',
                },
            });
        } else {
            alert('Điền đủ thông tin đi')
        }
    }
    render() {
        return (
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h3>Thông tin sinh viên</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleOnSubmit}>
                        <div className='form-group row'>
                            <div className="col-6">
                                <label>Mã sinh viên</label>
                                <input type="text" name='maSV' value={this.state.values.maSV} onChange={this.handleOnchange} className='form-control' />
                                <p className='text-danger'>{this.state.errors.maSV}</p>
                            </div>
                            <div className="col-6">
                                <label>Họ tên</label>
                                <input type="text" name='hoTen' value={this.state.values.hoTen} onChange={this.handleOnchange} className='form-control' />
                                <p className='text-danger'>{this.state.errors.hoTen}</p>
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className="col-6">
                                <label>Số điện thoại</label>
                                <input type="text" name='soDT' value={this.state.values.soDT} onChange={this.handleOnchange} className='form-control' />
                                <p className='text-danger'>{this.state.errors.soDT}</p>
                            </div>
                            <div className="col-6">
                                <label>Email</label>
                                <input type="email" name='email' value={this.state.values.email} onChange={this.handleOnchange} className='form-control' />
                                <p className='text-danger'>{this.state.errors.email}</p>
                            </div>
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn btn-success'>Thêm sinh viên</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitUser: (user) => {
            dispatch({
                type: 'SUBMIT_USER',
                payload: user
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Form);
