import React, { Component } from 'react'
import { connect } from 'react-redux'
class Modal extends Component {
    constructor(props) {
        super()
        this.state = {
            showModal: true,
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
            }
        };
        this.closeModal = React.createRef();
    }
    handleOnchange = (e) => {
        const { name, value } = e.target;
        let errMess = '';
        if (value.trim() === '') {
            errMess = `${name} không hợp lệ`
        }
        let values = { ...this.state.values, [name]: value }
        let errors = { ...this.state.errors, [name]: errMess }
        this.setState({
            values: values,
            errors: errors,
        })
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState((prevState) => ({
            ...prevState,
            values: newProps.userEdit
        }))
    }
    render() {
        return (
            <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true" ref={this.closeModal}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Form sửa thông tin</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">x</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Mã sinh viên</label>
                                    <input type="text" name='maSV' disabled value={this.state.values.maSV} className='form-control' />
                                    <p className='text-danger'>{this.state.errors.maSV}</p>
                                </div>
                                <div className="form-group">
                                    <label>Tên sinh viên</label>
                                    <input type="text" name='hoTen' onChange={this.handleOnchange} value={this.state.values.hoTen} className='form-control' />
                                    <p className='text-danger'>{this.state.errors.hoTen}</p>
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input type="text" name='soDT' onChange={this.handleOnchange} value={this.state.values.soDT} className='form-control' />
                                    <p className='text-danger'>{this.state.errors.soDT}</p>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name='email' onChange={this.handleOnchange} value={this.state.values.email} className='form-control' />
                                    <p className='text-danger'>{this.state.errors.email}</p>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                                onClick={() => {
                                    const allValuesFilled = Object.values(this.state.values).every((value) => value !== '');
                                    const allErrorsFilled = Object.values(this.state.errors).every((error) => error === '');
                                    if (allValuesFilled && allErrorsFilled) {
                                        this.props.updateUser(this.state.values)
                                        this.closeModal.current.click();
                                    }
                                    else {
                                        alert('Điền đủ thông tin đi')
                                    }

                                }}
                            >Chỉnh sửa</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        userEdit: state.formReducer.userEdit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => {
            dispatch({
                type: 'UPDATE_USER',
                payload: user
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)