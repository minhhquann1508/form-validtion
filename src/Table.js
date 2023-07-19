import React, { Component } from 'react'
import { connect } from 'react-redux'
class Table extends Component {
    constructor(props) {
        super()
    }
    renderTable = (list) => {
        return list?.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.maSV}</td>
                    <td>{user.hoTen}</td>
                    <td>{user.soDT}</td>
                    <td>{user.email}</td>
                    <td>
                        <button type="button" className="btn btn-success mr-1"
                            data-toggle="modal" data-target="#modelId"
                            onClick={() => {
                                this.props.getUserEdit(user.maSV)
                            }}
                        >
                            Sửa
                        </button>
                        <button className='btn btn-danger'
                            onClick={() => {
                                this.props.deleteUser(user.maSV)
                            }}
                        >Xóa</button>
                    </td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div >
                <h1>Danh sách sinh viên</h1>
                <table className="table" style={{ border: '1px solid black' }}>
                    <thead className='bg-dark'>
                        <tr className='text-white'>
                            <th>Mã SV</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable(this.props.listUser)}
                    </tbody>
                </table>
                <h1 className='mt-5'>Danh sách tìm kiếm</h1>
                <div className='my-5'>
                    <input type="text" placeholder='Tìm kiếm' onChange={(e) => this.props.findUser(e.target.value)} />
                </div>
                <table className="table my-5" style={{ border: '1px solid black' }}>
                    <thead className='bg-dark'>
                        <tr className='text-white'>
                            <th>Mã SV</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable(this.props.findingList)}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listUser: state.formReducer.listUser,
        findingList: state.formReducer.findingList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (maSV) => {
            dispatch({
                type: 'DELETE_USER',
                payload: maSV
            })
        },
        getUserEdit: (maSV) => {
            dispatch({
                type: 'GET_USER_EDIT',
                payload: maSV
            })
        },
        findUser: (keyword) => {
            dispatch({
                type: 'FINDING_USER',
                payload: keyword
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
