const htmlContent = (cvInfomation) => {
    return `<!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CV Cá Nhân</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                font-size: 14px;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .cv-container {
                max-width: 900px;
                margin: 20px auto;
                background: #fff;
                display: flex;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .left-column {
                width: 35%;
                background: #2c3e50;
                color: white;
                padding: 20px;
            }
            .left-column img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                display: block;
                margin: 0 auto;
            }
            .left-column h2 {
                text-align: center;
            }
            .left-column p, .left-column ul {
                font-size: 12px;
            }
            .right-column {
                width: 65%;
                padding: 20px;
            }
            .right-column h1 {
                margin: 0;
                font-size: 24px;
                color: #2c3e50;
            }
            .right-column h2 {
                font-size: 18px;
                border-bottom: 2px solid #2c3e50;
                padding-bottom: 5px;
            }
            .right-column p, .right-column ul {
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="cv-container">
            <div class="left-column">
                <img src="${cvInfomation.avatar}" alt="Profile Picture">
                <h2>${cvInfomation.last_name} ${cvInfomation.first_name}</h2>
                <p>${cvInfomation.job_search_criteria.job_type_label} ${cvInfomation.job_search_criteria.job}</p>
                
                <h3>Thông tin liên hệ</h3>
                <p>Email: ${cvInfomation.email}</p>
                ${cvInfomation.phones.map((phone)=>{
                    return `<p>Số điện thoại: ${phone.value}</p>`
                })}

                <p>${cvInfomation.job_search_criteria.district.name} ${cvInfomation.job_search_criteria.district.city.name}</p>
                
                <h3>Kỹ năng</h3>
                <ul>
                    ${cvInfomation.skills.map((skill) => {
                        return `<li>${skill.value}</li>`
                    }).join("")}
                </ul>
            </div>
            <div class="right-column">
                <h2>Học vấn</h2>
                ${cvInfomation.education_levels.map((educationLevel) => {
                    return (
                        `
                            <p><strong>${educationLevel.school_name}</strong> | ${educationLevel.mature}</p>
                            <ul>
                                <li>bằng cấp: ${educationLevel.certificate}</li>
                                <li>mô tả: ${educationLevel.description}</li>
                            </ul>
                        `
                    )
                }).join("")}
                <h2>Kinh nghiệm làm việc</h2>
                ${cvInfomation.experiences.map((experience) => {
                    return (
                        `
                            <p><strong>${experience.company_name}</strong></p>
                            <ul>
                                <li>công việc: ${experience.job}</li>
                                <li>mô tả: ${experience.description}</li>
                            </ul>
                        `
                    )
                })}
            </div>
        </div>
    </body>
    </html>
      `
}
export default htmlContent