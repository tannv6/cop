import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  fetchInquiryById,
  adminUpdateInquiry,
} from "../../api/inquiry"; // 실제 경로에 맞게 수정

const InquiryWriteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchInquiryById(Number(id))
        .then((data) => {
          setFormData({
            company: data.company || "",
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
            message: data.message || "",
          });
        })
        .catch(() => alert("조회 실패"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await adminUpdateInquiry(Number(id), formData);
        alert("수정 완료!");
      } else {
        alert("신규 등록은 별도 폼에서 처리하세요.");
      }
      navigate("/AdmMaster/inquiries/list");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("저장 실패: " + err.message);
      } else {
        alert("저장 실패: 알 수 없는 오류");
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div id="container" className="container-fluid text-black">
      <span id="print_this">
        <h3 className="mb-2 font-weight-bold m-0">문의관리</h3>
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex justify-content-end align-items-center">
            <div className="d-flex" style={{ gap: "5px" }}>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate("/AdmMaster/inquiries/list")}
                    disabled={loading}
                >
                  <i className="fa fa-bars" aria-hidden="true"></i> 목록
                </button>
              <button
                type="submit"
                form="frm"
                id="submitBtn"
                className="btn btn-primary btn-sm"
                onClick={handleSubmit}
                disabled={loading}
              >
                <i className="fa fa-cog" aria-hidden="true"></i>{" "}
                {id ? "수정" : "등록"}
              </button>
            </div>
          </div>
          <div id="contents">
            <div className="listWrap_noline">
              <form
                name="frm"
                id="frm"
                method="POST"
                className="bg-white p-2"
                onSubmit={handleSubmit}
              >
                {id && (
                  <input type="hidden" name="id" id="inquiryId" value={id} />
                )}
                <div className="listBottom">
                  <table
                    cellPadding={0}
                    cellSpacing={0}
                    className="table table-bordered"
                  >
                    <colgroup>
                      <col width="150px" />
                      <col width="35%" />
                      <col width="150px" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>회사명</th>
                        <td>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="form-control d-inline-block"
                            style={{ width: "250px" }}
                            disabled={loading}
                          />
                        </td>
                        <th>이름</th>
                        <td>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control d-inline-block"
                            style={{ width: "250px" }}
                            disabled={loading}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>연락처</th>
                        <td>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control d-inline-block"
                            style={{ width: "250px" }}
                            disabled={loading}
                          />
                        </td>
                        <th>이메일</th>
                        <td>
                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control d-inline-block"
                            style={{ width: "250px" }}
                            disabled={loading}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>내용</th>
                        <td colSpan={3}>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                              width: "100%",
                              height: "300px",
                              border: "1px solid #d1d3e2",
                              borderRadius: ".35rem",
                            }}
                            disabled={loading}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default InquiryWriteForm;
