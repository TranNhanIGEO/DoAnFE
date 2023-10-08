export const ListGroupLayer = [
    {
        label: 'Trường THPT thường'
    },
    {
        label: 'Trường THPT có lớp tích hợp'
    },
    {
        label: 'Trường THPT chuyên'
    },
]

export const ListSelectLayer = [
    {
        id: 'truongthuong_lopthuong',
        value: 'diemchuan_truongthuong_lopthuong',
        layer: 'THPT thường',
        group: 'Trường THPT thường'
    },
    {
        id: 'truongco_loptichhop',
        value: 'diemchuan_truongco_loptichhop',
        layer: 'THPT có lớp tích hợp',
        group: 'Trường THPT có lớp tích hợp'
    },
    {
        id: 'truongchuyen_lopthuong',
        value: 'diemchuan_truongchuyen_lopthuong',
        layer: 'THPT chuyên - Lớp thường',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_toan',
        value: 'diemchuan_truongchuyen_lopchuyen_toan',
        layer: 'THPT chuyên - Lớp chuyên Toán',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_van',
        value: 'diemchuan_truongchuyen_lopchuyen_van',
        layer: 'THPT chuyên - Lớp chuyên Văn',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_hoa',
        value: 'diemchuan_truongchuyen_lopchuyen_hoa',
        layer: 'THPT chuyên - Lớp chuyên Hóa',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_ly',
        value: 'diemchuan_truongchuyen_lopchuyen_ly',
        layer: 'THPT chuyên - Lớp chuyên Lý',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_sinh',
        value: 'diemchuan_truongchuyen_lopchuyen_sinh',
        layer: 'THPT chuyên - Lớp chuyên Sinh',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_su',
        value: 'diemchuan_truongchuyen_lopchuyen_su',
        layer: 'THPT chuyên - Lớp chuyên Sử',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_dia',
        value: 'diemchuan_truongchuyen_lopchuyen_dia',
        layer: 'THPT chuyên - Lớp chuyên Địa',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_tin',
        value: 'diemchuan_truongchuyen_lopchuyen_tin',
        layer: 'THPT chuyên - Lớp chuyên Tin',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_anh',
        value: 'diemchuan_truongchuyen_lopchuyen_anh',
        layer: 'THPT chuyên - Lớp chuyên Tiếng Anh',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_phap',
        value: 'diemchuan_truongchuyen_lopchuyen_phap',
        layer: 'THPT chuyên - Lớp chuyên Tiếng Pháp',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_nhat',
        value: 'diemchuan_truongchuyen_lopchuyen_nhat',
        layer: 'THPT chuyên - Lớp chuyên Tiếng Nhật',
        group: 'Trường THPT chuyên'
    },
    {
        id: 'truongchuyen_lopchuyen_trung',
        value: 'diemchuan_truongchuyen_lopchuyen_trung',
        layer: 'THPT chuyên - Lớp chuyên Tiếng Trung',
        group: 'Trường THPT chuyên'
    }
]

export const ListRadioLocation = [
    {
        id: 'current_position',
        value: 'current_position',
        location: 'Định vị bản đồ (mặc định)'
    },
    {
        id: 'address_position',
        value: 'address_position',
        location: 'Nhập địa chỉ'
    }
]

export const ListCheckPriority = [
    {
        id: '2',
        value: '2',
        priority: [<b key='2B'>Cộng 2 điểm: </b>, <span key='2P'> 
        Con liệt sĩ; Con thương binh mất sức lao động 81% trở lên; Con của người được cấp “Giấy chứng nhận người hưởng chính sách như thương binh mà
        người được cấp Giấy chứng nhận người hưởng chính sách như thương binh bị suy giảm khả năng lao động 81% trở lên”.</span>]
    },
    {
        id: '1.5',
        value: '1.5',
        priority: [<b key='1.5B'>Cộng 1.5 điểm: </b>, <span key='1.5P'> 
        Con của Anh hùng lực lượng vũ trang, con của Anh hùng lao động; Con thương binh mất sức lao động dưới 81 %; 
        Con của người được cấp “Giấy chứng nhận người hưởng chính sách như thương binh mà người được cấp Giấy chứng nhận người hưởng chính sách như thương binh bị suy giảm khả năng lao động dưới 81%”.</span>]
    },
    {
        id: '1',
        value: '1',
        priority: [<b key='1B'>Cộng 1 điểm: </b>, <span key='1P'> 
        Người có cha hoặc mẹ là người dân tộc thiểu số; Người dân tộc thiểu số.</span>]
    },
]
