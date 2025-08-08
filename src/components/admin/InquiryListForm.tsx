import React, { useState, useEffect } from "react";
import {
  fetchInquiries,
  deleteInquiry,
  deleteMultipleInquiries,
  type Inquiry,
} from "../../api/inquiry"; // 경로는 프로젝트에 맞게 조정
import { useNavigate } from "react-router-dom";

// 이름 마스킹
const maskName = (name: string) => {
  if (!name) return "";
  if (name.length === 1) return name;
  if (name.length === 2) return name[0] + "*";
  return name[0] + "*".repeat(name.length - 2) + name.slice(-1);
};
// 연락처 마스킹
const maskPhone = (phone: string) => {
  const onlyNum = phone.replace(/[^0-9]/g, "");
  if (onlyNum.length === 11)
    return onlyNum.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
  if (onlyNum.length === 10)
    return onlyNum.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-***-$3");
  return phone;
};

const InquiryListForm: React.FC = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showNameIdx, setShowNameIdx] = useState<number | null>(null);
  const [showPhoneIdx, setShowPhoneIdx] = useState<number | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<string>("10");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 데이터 조회
  const loadRows = async () => {
    setLoading(true);
    try {
      const res = await fetchInquiries({
        limit: Number(rowsPerPage),
        page,
        keyword: searchWord,
      });
      setRows(res.data);
      setTotal(res.total);
      setSelectedIds([]); // 조회할 때마다 선택해제
    } catch (e) {
      alert("목록 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
    // eslint-disable-next-line
  }, [rowsPerPage, page]);

  // 한 행 선택/해제
  const handleCheckboxChange = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  // 전체 선택/해제
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? rows.map((row) => row.id) : []);
  };

  // 개별 삭제 (행의 휴지통 버튼)
  const handleRowDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true);
    try {
      await deleteInquiry(id);
      await loadRows();
    } catch (e) {
      alert("삭제 실패");
      setLoading(false);
    }
  };

  // 선택 삭제
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("삭제할 항목을 선택하세요.");
      return;
    }
    if (!window.confirm("선택된 항목을 삭제하시겠습니까?")) return;
    setLoading(true);
    try {
      await deleteMultipleInquiries(selectedIds);
      await loadRows();
    } catch (e) {
      alert("삭제 실패");
      setLoading(false);
    }
  };

  // 검색
  const handleSearch = async () => {
    setPage(1);
    await loadRows();
  };

  // 페이징 렌더링
  const totalPages = Math.max(1, Math.ceil(total / Number(rowsPerPage)));
  const handleMovePage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-black font-weight-bold">문의관리</h1>
      <div className="card shadow mb-4">
        {/* 상단 컨트롤 */}
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div>
              <select
                id="g_list_rows"
                className="form-control select-custom"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(e.target.value);
                  setPage(1);
                }}
                disabled={loading}
              >
                {["10", "20", "30", "40", "50"].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <form
              className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSearch();
              }}
              name="frmSearch"
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light small"
                  style={{ width: "300px" }}
                  name="search_word"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  placeholder="검색어 입력해주세요!"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  disabled={loading}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit" disabled={loading}>
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSelectAll(true);
              }}
              className="btn btn-success btn-sm"
              aria-disabled={loading}
              style={loading ? { pointerEvents: "none", opacity: 0.5 } : {}}
            >
              전체선택
            </a>{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSelectAll(false);
              }}
              className="btn btn-success btn-sm"
              aria-disabled={loading}
              style={loading ? { pointerEvents: "none", opacity: 0.5 } : {}}
            >
              선택해제
            </a>{" "}
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault();
                await handleDelete();
              }}
              className="btn btn-danger btn-sm"
              aria-disabled={loading}
              style={loading ? { pointerEvents: "none", opacity: 0.5 } : {}}
            >
              선택삭제
            </a>
          </div>
        </div>
        {/* 표 */}
        <div className="card-body">
          <div className="table-responsive">
            <form name="frm" id="frm">
              <table
                className="table table-bordered"
                style={{ tableLayout: "fixed" }}
              >
                <colgroup>
                  <col width="5%" />
                  <col width="5%" />
                  <col width="20%" />
                  <col width="10%" />
                  <col width="20%" />
                  <col width="15%" />
                  <col width="15%" />
                  <col width="10%" />
                </colgroup>
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">
                      <label className="my-checkbox">
                        <input
                          type="checkbox"
                          checked={rows.length > 0 && selectedIds.length === rows.length}
                          onChange={(e) =>
                            handleSelectAll(e.target.checked)
                          }
                          disabled={loading || rows.length === 0}
                        />
                        <span className="my-checkmark"></span>
                      </label>
                    </th>
                    <th className="text-center">번호</th>
                    <th className="text-center">회사명</th>
                    <th className="text-center">이름</th>
                    <th className="text-center">이메일</th>
                    <th className="text-center">연락처</th>
                    <th className="text-center">등록일시</th>
                    <th className="text-center">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="text-center">
                        <span style={{ color: "#1976d2" }}>로딩중...</span>
                      </td>
                    </tr>
                  ) : rows.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center">
                        데이터가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    rows.map((row, idx) => (
                      <tr key={row.id}>
                        <td className="text-center">
                          <label className="my-checkbox">
                            <input
                              type="checkbox"
                              name="idx[]"
                              checked={selectedIds.includes(row.id)}
                              onChange={(e) =>
                                handleCheckboxChange(row.id, e.target.checked)
                              }
                              disabled={loading}
                            />
                            <span className="my-checkmark"></span>
                          </label>
                        </td>
                        <td className="text-center">{row.id}</td>
                        <td className="text-center">{row.company}</td>
                        <td className="text-center">
                          {showNameIdx === idx ? (
                            <>
                              {row.name}{" "}
                              <span
                                style={{
                                  color: "#1976d2",
                                  cursor: "pointer",
                                }}
                                onClick={() => setShowNameIdx(null)}
                              >
                                [숨기기]
                              </span>
                            </>
                          ) : (
                            <>
                              {maskName(row.name)}{" "}
                              <span
                                style={{
                                  color: "#1976d2",
                                  cursor: "pointer",
                                }}
                                onClick={() => setShowNameIdx(idx)}
                              >
                                [보기]
                              </span>
                            </>
                          )}
                        </td>
                        <td className="text-center">{row.email}</td>
                        <td className="text-center">
                          {showPhoneIdx === idx ? (
                            <>
                              {row.phone}{" "}
                              <span
                                style={{
                                  color: "#1976d2",
                                  cursor: "pointer",
                                }}
                                onClick={() => setShowPhoneIdx(null)}
                              >
                                [숨기기]
                              </span>
                            </>
                          ) : (
                            <>
                              {maskPhone(row.phone)}{" "}
                              <span
                                style={{
                                  color: "#1976d2",
                                  cursor: "pointer",
                                }}
                                onClick={() => setShowPhoneIdx(idx)}
                              >
                                [보기]
                              </span>
                            </>
                          )}
                        </td>
                        <td className="text-center">{row.createdAt}</td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-info btn-circle btn-sm mr-1"
                            title="수정"
                            disabled={loading}
                            onClick={() => navigate(`/AdmMaster/inquiries/write?id=${row.id}`)}
                            >
                            <i className="fa fa-cog"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-circle btn-sm"
                            title="삭제"
                            disabled={loading}
                            onClick={() => handleRowDelete(row.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </form>
            {/* 페이징 */}
            <div className="paging mt-5">
              <ul className="pagination justify-content-center">
                <li className="first page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMovePage(1);
                    }}
                  >
                    &lt;&lt; 처음
                  </a>
                </li>
                <li className="prev page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMovePage(page - 1);
                    }}
                  >
                    &lt; 이전
                  </a>
                </li>
                {/* 최대 5개까지 페이지 번호 노출 */}
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  let n = page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
                  if (n < 1 || n > totalPages) return null;
                  return (
                    <li
                      key={n}
                      className={`page-item${n === page ? " active" : ""}`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleMovePage(n);
                        }}
                      >
                        {n}
                      </a>
                    </li>
                  );
                })}
                <li className="next page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMovePage(page + 1);
                    }}
                  >
                    다음 &gt;
                  </a>
                </li>
                <li className="last page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMovePage(totalPages);
                    }}
                  >
                    맨끝 &gt;&gt;
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* 부트스트랩 동그라미 버튼 + 체크박스 커스텀 CSS */}
      <style>{`
        .btn-circle {
          border-radius: 50%!important;
          width: 32px; height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          font-size: 16px;
        }
        .my-checkbox {
          display: inline-block;
          position: relative;
          cursor: pointer;
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        .my-checkbox input[type="checkbox"] {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
          margin: 0;
          z-index: 2;
        }
        .my-checkbox .my-checkmark {
          position: absolute;
          top: 0; left: 0;
          height: 20px;
          width: 20px;
          background: #fff;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          transition: all 0.2s;
          z-index: 1;
          box-sizing: border-box;
        }
        .my-checkbox input:checked + .my-checkmark {
          background: #1976d2;
          border-color: #1976d2;
        }
        .my-checkbox .my-checkmark:after {
          content: "";
          display: none;
        }
        .my-checkbox input:checked + .my-checkmark:after {
          display: block;
        }
        .my-checkbox .my-checkmark:after {
          position: absolute;
          left: 5px;
          top: 2px;
          width: 6px;
          height: 12px;
          border: solid #fff;
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
          content: "";
        }
      `}</style>
    </div>
  );
};

export default InquiryListForm;
