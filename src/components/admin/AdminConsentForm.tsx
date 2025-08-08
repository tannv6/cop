import React, { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from "react-router-dom";

import { getPolicy, updatePolicy } from "../../api/admin";

const AdminConsentForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const fetchPolicy = async () => {
    setLoading(true);
    try {
      const res = await getPolicy("consent", "ko");
      setContent(res.content || "");
    } catch (err: any) {
      alert(err.message || "불러오기 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await updatePolicy({
        type: "consent",
        language: "ko",
        title: "개인정보처리방침",
        content,
      });
      alert("저장 완료");
    } catch (err: any) {
      alert(err.message || "저장 실패");
    }
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  // config를 as any로 타입 단언 (fontSize 경고 방지)
  const editorConfig: any = {
    toolbar: [
      "heading", "|",
      "fontSize", // 글자크기 조절
      "bold", "italic", "underline", "strikethrough", "|",
      "bulletedList", "numberedList", "|",
      "link", "blockQuote", "insertTable", "imageUpload", "|",
      "undo", "redo"
    ],
    fontSize: {
      options: [
        9, 11, 13, "default", 17, 19, 21, 27, 35
      ],
      supportAllValues: false
    },
    language: "ko"
  };

  return (
    <div className="container-fluid">
      <div className="btn-group mb-3">
        <Link className="btn btn-secondary" to="/AdmMaster/policy">개인정보처리방침</Link>
        <Link className="btn btn-primary" to="/AdmMaster/consent">개인정보수집·이용동의</Link>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-end">
          <button onClick={handleSubmit} className="btn btn-primary btn-sm">
            <i className="fa fa-cog" /> 글 등록
          </button>
        </div>
        <div className="card-body">
          {loading ? (
            <p>불러오는 중...</p>
          ) : (
            <CKEditor
              editor={ClassicEditor as any}
              data={content}
              config={editorConfig}
              onChange={(_, editor) => setContent(editor.getData())}
            />
          )}
        </div>
        <div className="card-footer d-flex justify-content-end">
          <button onClick={handleSubmit} className="btn btn-primary btn-sm">
            <i className="fa fa-cog" /> 글 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminConsentForm;