import React, { useState, useEffect } from 'react';

const ClappyApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  // Simulated real-time leaderboard data
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'Nguyễn Minh Anh', score: 950, avatar: '🧑‍🎓', trend: 'up' },
    { id: 2, name: 'Trần Văn Hùng', score: 920, avatar: '👨‍🎓', trend: 'up' },
    { id: 3, name: 'Lê Thị Mai', score: 890, avatar: '👩‍🎓', trend: 'down' },
    { id: 4, name: 'Phạm Đức Anh', score: 850, avatar: '🧑‍🎓', trend: 'same' },
    { id: 5, name: 'Hoàng Thị Lan', score: 820, avatar: '👩‍🎓', trend: 'up' },
  ]);

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Tổng quan' },
    { id: 'documents', icon: '📚', label: 'Kho tài liệu' },
    { id: 'scores', icon: '🏆', label: 'Bảng điểm' },
    { id: 'templates', icon: '✨', label: 'Kho mẫu' },
    { id: 'settings', icon: '⚙️', label: 'Cài đặt' },
  ];

  const documents = [
    { id: 1, name: 'Toán 10 - Chương 1', type: 'folder', locked: true, items: 12 },
    { id: 2, name: 'Lý 11 - Điện học', type: 'folder', locked: true, items: 8 },
    { id: 3, name: 'Hóa 12 - Hữu cơ', type: 'folder', locked: false, items: 15 },
    { id: 4, name: 'Văn 10 - Văn học dân gian', type: 'folder', locked: true, items: 6 },
  ];

  const templates = [
    { id: 1, name: 'Quiz trắc nghiệm', preview: '🎯', category: 'Quiz' },
    { id: 2, name: 'Slide tương tác', preview: '🖐️', category: 'Slide' },
    { id: 3, name: 'Kéo thả đáp án', preview: '🔀', category: 'Interactive' },
    { id: 4, name: 'Điền vào chỗ trống', preview: '✏️', category: 'Quiz' },
  ];

  // Animate leaderboard updates
  useEffect(() => {
    if (activeTab === 'scores' && isOnline) {
      const interval = setInterval(() => {
        setLeaderboard(prev => {
          const updated = [...prev];
          const randomIndex = Math.floor(Math.random() * updated.length);
          updated[randomIndex] = {
            ...updated[randomIndex],
            score: updated[randomIndex].score + Math.floor(Math.random() * 20),
            trend: Math.random() > 0.5 ? 'up' : 'down'
          };
          return updated.sort((a, b) => b.score - a.score);
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab, isOnline]);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-8 text-white shadow-2xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-400/30 blur-2xl" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight">Chào mừng trở lại! 👋</h2>
          <p className="mt-2 text-blue-100">Hôm nay bạn có 3 lớp học đang chờ</p>
          <button className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="text-2xl">▶️</span>
            <span>Dạy ngay</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-green-100 transition-transform duration-500 group-hover:scale-150" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500">
                <div className="h-2 w-2 animate-ping rounded-full bg-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-500">Đang online</span>
            </div>
            <p className="mt-2 text-4xl font-bold text-gray-800">42</p>
            <p className="text-sm text-gray-500">học sinh</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-100 transition-transform duration-500 group-hover:scale-150" />
          <div className="relative">
            <span className="text-sm font-medium text-gray-500">Bài tập hoàn thành</span>
            <p className="mt-2 text-4xl font-bold text-gray-800">128</p>
            <p className="text-sm text-gray-500">tuần này</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-purple-100 transition-transform duration-500 group-hover:scale-150" />
          <div className="relative">
            <span className="text-sm font-medium text-gray-500">Điểm trung bình</span>
            <p className="mt-2 text-4xl font-bold text-gray-800">8.5</p>
            <p className="text-sm text-green-500">↑ 0.3 vs tuần trước</p>
          </div>
        </div>
      </div>

      {/* Schedule & Activity */}
      <div className="grid grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
            <span>📅</span> Lịch dạy hôm nay
          </h3>
          <div className="mt-4 space-y-3">
            {[
              { time: '08:00', class: 'Toán 10A1', status: 'done' },
              { time: '10:00', class: 'Lý 11A2', status: 'current' },
              { time: '14:00', class: 'Toán 12A1', status: 'upcoming' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 rounded-xl p-4 transition-all duration-300 ${
                  item.status === 'current'
                    ? 'bg-blue-50 ring-2 ring-blue-500'
                    : item.status === 'done'
                    ? 'bg-gray-50 opacity-60'
                    : 'bg-gray-50 hover:bg-blue-50'
                }`}
              >
                <span className={`text-sm font-mono font-bold ${item.status === 'current' ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.time}
                </span>
                <span className="font-medium text-gray-800">{item.class}</span>
                {item.status === 'current' && (
                  <span className="ml-auto rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                    ĐANG DẠY
                  </span>
                )}
                {item.status === 'done' && (
                  <span className="ml-auto text-green-500">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
            <span>🔔</span> Thông báo
          </h3>
          <div className="mt-4 space-y-3">
            {[
              { icon: '📝', text: '15 học sinh đã nộp bài Toán chương 3', time: '5 phút trước', new: true },
              { icon: '🎉', text: 'Nguyễn Minh Anh đạt điểm cao nhất lớp!', time: '1 giờ trước', new: true },
              { icon: '📊', text: 'Báo cáo tuần đã sẵn sàng', time: '2 giờ trước', new: false },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 rounded-xl p-4 transition-all duration-300 hover:bg-gray-50 ${
                  item.new ? 'bg-blue-50/50' : ''
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{item.text}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
                {item.new && <div className="h-2 w-2 rounded-full bg-blue-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/50 p-8 text-center transition-all duration-300 hover:border-blue-500 hover:bg-blue-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl transition-transform duration-300 group-hover:scale-110">
            📤
          </div>
          <p className="mt-4 font-semibold text-gray-700">Kéo thả file vào đây để tải lên</p>
          <p className="text-sm text-gray-500">Hỗ trợ PDF, PPTX, DOCX (tối đa 50MB)</p>
          <button className="mt-4 rounded-xl bg-blue-500 px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg">
            Chọn file
          </button>
        </div>
      </div>

      {/* Folder Grid */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-gray-800">Thư mục của bạn</h3>
        <div className="grid grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-50 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-2xl shadow-lg">
                    📁
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{doc.name}</h4>
                    <p className="text-sm text-gray-500">{doc.items} tài liệu</p>
                  </div>
                </div>
                {doc.locked && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    🔒
                  </div>
                )}
              </div>
              <div className="relative mt-4 flex gap-2">
                <button className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
                  Mở
                </button>
                <button className="rounded-lg bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
                  Chia sẻ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScores = () => (
    <div className="space-y-6">
      {/* Leaderboard Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-6 text-white shadow-2xl">
        <div className="absolute -right-10 top-0 text-9xl opacity-20">🏆</div>
        <div className="relative">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Bảng xếp hạng Real-time</h2>
            {isOnline && (
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                LIVE
              </span>
            )}
          </div>
          <p className="mt-1 text-white/80">Quiz: Toán - Chương 3 - Lớp 10A1</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="space-y-3">
          {leaderboard.map((student, idx) => (
            <div
              key={student.id}
              className={`flex items-center gap-4 rounded-xl p-4 transition-all duration-500 ${
                idx === 0
                  ? 'bg-gradient-to-r from-amber-50 to-yellow-50 ring-2 ring-amber-300'
                  : idx === 1
                  ? 'bg-gradient-to-r from-gray-50 to-slate-50 ring-1 ring-gray-200'
                  : idx === 2
                  ? 'bg-gradient-to-r from-orange-50 to-amber-50 ring-1 ring-orange-200'
                  : 'bg-gray-50 hover:bg-blue-50'
              }`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                idx === 0 ? 'bg-amber-400 text-white' :
                idx === 1 ? 'bg-gray-400 text-white' :
                idx === 2 ? 'bg-orange-400 text-white' :
                'bg-blue-100 text-blue-600'
              }`}>
                {idx + 1}
              </div>
              <span className="text-2xl">{student.avatar}</span>
              <span className="flex-1 font-medium text-gray-800">{student.name}</span>
              <div className="flex items-center gap-2">
                <span className={`text-lg ${
                  student.trend === 'up' ? 'text-green-500' :
                  student.trend === 'down' ? 'text-red-500' :
                  'text-gray-400'
                }`}>
                  {student.trend === 'up' ? '↑' : student.trend === 'down' ? '↓' : '−'}
                </span>
                <span className="text-xl font-bold text-gray-800">{student.score}</span>
                <span className="text-sm text-gray-500">điểm</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-xl bg-blue-500 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg">
            📊 Xuất báo cáo Excel
          </button>
          <button className="rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-200">
            🔄 Làm mới
          </button>
        </div>
      </div>

      {!isOnline && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-amber-800">
          <span className="font-medium">⚠️ Đang ở chế độ Offline - Bảng xếp hạng sẽ không cập nhật real-time</span>
        </div>
      )}
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2">
        {['Tất cả', 'Slide', 'Quiz', 'Interactive'].map((cat, idx) => (
          <button
            key={cat}
            className={`rounded-xl px-4 py-2 font-medium transition-all duration-300 ${
              idx === 0 ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-blue-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Preview Area */}
            <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
              <span className="text-6xl transition-transform duration-300 group-hover:scale-125">
                {template.preview}
              </span>
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/10 group-hover:opacity-100">
                <button className="rounded-xl bg-white px-4 py-2 font-medium text-blue-600 shadow-lg transition-transform duration-300 hover:scale-105">
                  Xem trước
                </button>
              </div>
            </div>
            {/* Info */}
            <div className="p-4">
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                {template.category}
              </span>
              <h4 className="mt-2 font-bold text-gray-800">{template.name}</h4>
              <button className="mt-3 w-full rounded-xl bg-blue-500 py-2 font-medium text-white transition-all duration-300 hover:bg-blue-600">
                Sử dụng mẫu này
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Bank */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800">📝 Ngân hàng câu hỏi Quiz</h3>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {['Toán học', 'Vật lý', 'Hóa học', 'Ngữ văn', 'Tiếng Anh', 'Lịch sử'].map((subject) => (
            <button
              key={subject}
              className="rounded-xl border border-gray-200 bg-white p-4 text-center font-medium text-gray-700 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800">🌐 Trạng thái kết nối</h3>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className={`h-4 w-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}>
              {isOnline && <div className="h-4 w-4 animate-ping rounded-full bg-green-400" />}
            </div>
            <span className="font-medium text-gray-800">
              {isOnline ? 'Trực tuyến' : 'Ngoại tuyến'}
            </span>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`relative h-8 w-16 rounded-full transition-all duration-300 ${
              isOnline ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                isOnline ? 'left-9' : 'left-1'
              }`}
            />
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          {isOnline
            ? '✅ Bảng xếp hạng đang cập nhật real-time'
            : '💾 Dữ liệu đã được lưu sẵn trên máy - Có thể dạy mà không cần mạng'}
        </p>
      </div>

      {/* Device Management */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800">📱 Quản lý thiết bị</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📺</span>
              <div>
                <p className="font-medium text-gray-800">Tivi cảm ứng lớp 10A1</p>
                <p className="text-sm text-green-600">Đã kết nối</p>
              </div>
            </div>
            <button className="rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              Ngắt kết nối
            </button>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📲</span>
              <div>
                <p className="font-medium text-gray-800">Thiết bị học sinh</p>
                <p className="text-sm text-gray-500">28 thiết bị đang kết nối</p>
              </div>
            </div>
            <button className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              Quản lý
            </button>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800">🔐 Bảo mật tài liệu</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Mã hóa tài liệu</span>
            <div className="flex h-6 w-12 items-center rounded-full bg-blue-500 p-1">
              <div className="ml-auto h-4 w-4 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Yêu cầu mật khẩu khi mở</span>
            <div className="flex h-6 w-12 items-center rounded-full bg-blue-500 p-1">
              <div className="ml-auto h-4 w-4 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Chống sao chép</span>
            <div className="flex h-6 w-12 items-center rounded-full bg-gray-300 p-1">
              <div className="h-4 w-4 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800">👤 Tài khoản</h3>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-2xl text-white shadow-lg">
            👩‍🏫
          </div>
          <div>
            <p className="font-bold text-gray-800">Nguyễn Thị Lan</p>
            <p className="text-sm text-gray-500">lan.nguyen@school.edu.vn</p>
            <p className="text-xs text-blue-600">Giáo viên - Gói Premium</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'documents': return renderDocuments();
      case 'scores': return renderScores();
      case 'templates': return renderTemplates();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-slate-100" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Sidebar */}
      <aside className="flex w-72 flex-col bg-white shadow-xl">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
              <span className="text-2xl">👏</span>
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-blue-600">Clappy</h1>
            <p className="text-xs text-gray-400">Interactive Learning</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
              {activeTab === item.id && (
                <span className="ml-auto text-white/60">→</span>
              )}
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mx-4 mb-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <p className="text-sm font-medium text-gray-600">Bài giảng hôm nay</p>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-3xl font-bold text-blue-600">3</span>
            <span className="text-sm text-gray-500">/ 5 hoàn thành</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100">
            <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
          {/* Search */}
          <div className={`relative transition-all duration-300 ${searchFocused ? 'w-96' : 'w-80'}`}>
            <input
              type="text"
              placeholder="Tìm bài giảng, học sinh, mẫu slide..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm transition-all duration-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Sync Status */}
            <div className={`flex items-center gap-2 rounded-xl px-4 py-2 ${
              isOnline ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
            }`}>
              <div className="relative">
                <span className="text-lg">{isOnline ? '📶' : '📴'}</span>
                {isOnline && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-green-500">
                    <span className="absolute inset-0 animate-ping rounded-full bg-green-400" />
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold">
                {isOnline ? 'Trực tuyến' : 'Ngoại tuyến'}
              </span>
            </div>

            {/* Notifications */}
            <button className="relative rounded-xl bg-gray-50 p-3 transition-all duration-300 hover:bg-gray-100">
              <span className="text-xl">🔔</span>
              {showNotification && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  3
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 py-2 pl-2 pr-4 transition-all duration-300 hover:bg-gray-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-lg shadow-md">
                👩‍🏫
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-800">Cô Lan</p>
                <p className="text-xs text-gray-500">Giáo viên</p>
              </div>
              <span className="ml-2 text-gray-400">▼</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.id === activeTab)?.label}
            </h2>
            <p className="text-gray-500">
              {activeTab === 'dashboard' && 'Tổng quan hoạt động giảng dạy của bạn'}
              {activeTab === 'documents' && 'Quản lý và bảo mật tài liệu giảng dạy'}
              {activeTab === 'scores' && 'Theo dõi điểm số và bảng xếp hạng học sinh'}
              {activeTab === 'templates' && 'Khám phá các mẫu slide và quiz có sẵn'}
              {activeTab === 'settings' && 'Cấu hình ứng dụng và thiết bị'}
            </p>
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ClappyApp;
