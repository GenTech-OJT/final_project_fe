import { Button } from 'antd'
import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Packer,
  WidthType,
} from 'docx'
import { useParams } from 'react-router-dom'
import '../../pages/CV/cv.css'
import { useGetEmployeeById } from '@hooks/useEmployee'
import { useGetProjectsByEmployeeId } from '@hooks/useEmployee'
import { useTranslation } from 'react-i18next'

const ExportDocx = () => {
  const { id } = useParams()
  const { data: employeeDetails, isLoading: loadingEmployeeDetails } =
    useGetEmployeeById(id)
  const { data: employeeProjects, isLoading: loadingEmployeeProjects } =
    useGetProjectsByEmployeeId(id)
  const { t } = useTranslation('translation')

  if (loadingEmployeeDetails || loadingEmployeeProjects) {
    return <div>loading...</div>
  }

  // Hàm tạo tài liệu Docx
  const createDocument = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${employeeDetails.name.toUpperCase()}\n`,
                  bold: true,
                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                }),

                new TextRun({
                  text: `Phone: ${employeeDetails.phone}\n`,
                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                  break: 1,
                }),
                new TextRun({
                  text: `Email: ${employeeDetails.email}\n`,
                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                  break: 1,
                }),
              ],
            }),

            // Kinh nghiệm làm việc
            new Paragraph({
              children: [
                new TextRun({
                  text: 'WORKING EXPERIENCE\n',
                  bold: true,
                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                  break: 1,
                }),

                new TextRun({
                  text: `${employeeDetails.createdAt
                    .split('T')[0]
                    .replace(/-/g, '/')} - Now`,
                  bold: true,
                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                  break: 1,
                }),
                new TextRun({
                  text: `Role: ${
                    employeeDetails.is_manager === true ||
                    employeeDetails.is_manager === 'true'
                      ? 'Manager'
                      : 'Employee'
                  }\n`,
                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                  break: 1,
                }),

                new TextRun({
                  text: `${employeeDetails.position}\n`,
                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                  break: 1,
                }),
                new TextRun({
                  text: employeeDetails.description
                    ? `${employeeDetails.description}\n`
                    : 'No Description',
                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                  break: 1,
                }),
                new TextRun({
                  text: `Languages and Framework: ${employeeDetails.skills
                    .map(skill => `${skill.name}`)
                    .join(', ')}\n`,
                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'TYPICAL PROJECTS\n',
                  bold: true,
                  font: {
                    name: 'Meiryo',
                  },
                  break: 1,
                }),
              ],
            }),
            ...employeeProjects.map(
              employeeProjects =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Project Name: ${employeeProjects.name}\n`,
                      bold: true,
                      font: {
                        name: 'Meiryo',
                        size: 24,
                      },
                    }),
                    new TextRun({
                      text: `Description: ${employeeProjects.description}\n`,
                      font: {
                        name: 'Meiryo',
                        size: 24,
                      },
                      break: 1,
                    }),
                    new TextRun({
                      text: `Languages and Framework: ${employeeProjects.technical
                        .map(item => item.name)
                        .join(', ')}\n`,
                      font: {
                        name: 'Meiryo',
                        size: 24,
                      },
                      break: 1,
                    }),
                  ],
                })
            ),

            new Paragraph({
              children: [
                new TextRun({
                  text: '\nTECHNICAL SKILLS/QUALIFICATIONS\n',
                  bold: true,
                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                  break: 1,
                }),
              ],
            }),

            // Tạo bảng kỹ năng
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              rows: [
                // Thêm hàng tiêu đề cho bảng
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: 'Skill',
                              font: {
                                name: 'Meiryo',
                                size: 24,
                              },
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: 'Experience (in years)',
                              font: {
                                name: 'Meiryo',
                                size: 24,
                              },
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                // Thêm từng kỹ năng từ mảng skills vào bảng
                ...employeeDetails.skills.map(
                  skill =>
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: skill.name,
                                  font: {
                                    name: 'Meiryo',
                                    size: 24,
                                  },
                                }),
                              ],
                            }),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: skill.year,
                                  font: {
                                    name: 'Meiryo',
                                    size: 24,
                                  },
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    })
                ),
                // Thêm hàng mô tả cuối cùng vào bảng kỹ năng
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: 'Legends – Experience is a number of years that the candidate has significant experience within that respective skill. Level is: 1. Basic Capabilities, 2. Advanced Capabilities, 3. Demonstrated Expertise or 4. Teaching/Lead Capabilities. ',
                              font: {
                                name: 'Meiryo',
                                size: 24,
                              },
                            }),
                          ],
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'IMPORTANT CONFIDENTIALITY NOTICE: This document contains confidential and or legally privileged information. ST United reserves all rights hereunder. When distributed or transmitted, it is intended solely for the authorized use of the addressee or intended recipient. Access to this information by anyone else is unauthorized. Disclosure, copying, distribution or any action or omission taken in reliance on it is prohibited and may be unlawful. Please, report any exceptions hereto immediately to hello@stunited.vn',

                  font: {
                    name: 'Meiryo',
                    size: 24,
                  },
                  break: 1,
                }),
              ],
            }),
          ],
        },
      ],
    })

    return doc
  }

  const saveDocumentToFile = async (doc, fileName) => {
    const blob = await Packer.toBlob(doc)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExport = () => {
    const doc = createDocument()
    saveDocumentToFile(doc, 'cv.docx')
  }

  return (
    <div className="export-container">
      <Button type="primary" onClick={handleExport}>
        {t('button_input.export_csv')}
      </Button>
    </div>
  )
}

export default ExportDocx