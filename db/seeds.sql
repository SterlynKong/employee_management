INSERT INTO
    departments (id, name)
Values
    (1,'Executive'),
    (2, 'Accounts Receivable'),
    (3, 'Accounts Payable'),
    (4, 'Billing'),
    (5, 'IT Department'),
    (6, 'Purshasing Department'),
    (7, 'HR Department');

INSERT INTO
    roles (title, salary, department_id)
Values
    (
        'CEO',
        20000000,
        1
    ),
    (
        'AR Administrator',
        50000,
        2
    ),
    (
        'AP Administrator',
        45000,
        3
    ),
    (
        'HelpDesk Agent (Level1)',
        48000,
        5
    ),
    (
        'HelpDesk Agent (Level2)',
        55000,
        5
    ),
    (
        'IT Manager',
        10060000,
        5
    ),
    (
        'Purchase Manager',
        58000,
        6
    ),
    (
        'Purshaser',
        49000,
        6
    ),
    (
        'HR Manager',
        56000,
        7
    ),
    (
        'HR Generalist',
        50000,
        7
    );

INSERT INTO
    employees (first_name, last_name, role_id, manager_id)
Values
    (
        'Boss',
        'Lady',
        1,
        1
    ),
    (
        'Sterlyn',
        'Kong',
        4,
        1
    ),
    (
        'Jiawei',
        'Wang',
        7,
        1
    ),
    (
        'Steven',
        'Clarke',
        4,
        1
    ),
    (
        'Obrem',
        'Oxford',
        2,
        1
    ),
    (
        'Mala',
        'Ogden',
        6,
        1
    ),
    (
        'Jerulah',
        'Kordner',
        2,
        1
    ),
    (
        'Germaine',
        'Horton',
        2,
        1
    );
