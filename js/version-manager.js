/**
 * 安全码综合管理平台 V5.0 - 版本管理工具
 * 用于版本归档、变更记录生成
 */

const VersionManager = {
  /**
   * 版本号解析
   */
  parseVersion(version) {
    const match = version.match(/V?(\d+)\.(\d+)(?:\.(\d+))?/i);
    if (!match) return null;
    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2]),
      patch: match[3] ? parseInt(match[3]) : 0
    };
  },
  
  /**
   * 版本号递增
   */
  incrementVersion(version, type = 'minor') {
    const v = this.parseVersion(version);
    if (!v) return 'V1.0.0';
    
    switch (type) {
      case 'major':
        return `V${v.major + 1}.0.0`;
      case 'minor':
        return `V${v.major}.${v.minor + 1}.0`;
      case 'patch':
        return `V${v.major}.${v.minor}.${v.patch + 1}`;
      default:
        return `V${v.major}.${v.minor}.${v.patch}`;
    }
  },
  
  /**
   * 生成变更日志
   */
  generateChangelog(changes) {
    const lines = [];
    const date = new Date().toISOString().split('T')[0];
    
    lines.push(`# 更新日志 - ${date}`);
    lines.push('');
    
    // 按类型分组
    const added = changes.filter(c => c.type === 'added');
    const changed = changes.filter(c => c.type === 'changed');
    const fixed = changes.filter(c => c.type === 'fixed');
    const removed = changes.filter(c => c.type === 'removed');
    
    if (added.length > 0) {
      lines.push('### ✨ 新增功能');
      added.forEach(c => {
        lines.push(`- ${c.description} (${c.module})`);
      });
      lines.push('');
    }
    
    if (changed.length > 0) {
      lines.push('### 🔄 功能变更');
      changed.forEach(c => {
        lines.push(`- ${c.description} (${c.module})`);
      });
      lines.push('');
    }
    
    if (fixed.length > 0) {
      lines.push('### 🐛 问题修复');
      fixed.forEach(c => {
        lines.push(`- ${c.description} (${c.module})`);
      });
      lines.push('');
    }
    
    if (removed.length > 0) {
      lines.push('### 🗑️ 移除功能');
      removed.forEach(c => {
        lines.push(`- ${c.description} (${c.module})`);
      });
      lines.push('');
    }
    
    return lines.join('\n');
  },
  
  /**
   * 生成归档脚本（PowerShell）
   */
  generateArchiveScript(options) {
    const { sourceDir, archiveDir, keepCount = 3 } = options;
    
    const script = `
# 版本归档脚本
# 生成时间: ${new Date().toLocaleString()}

$SourceDir = "${sourceDir}"
$ArchiveDir = "${archiveDir}"
$KeepCount = ${keepCount}

# 创建归档目录
if (-not (Test-Path $ArchiveDir)) {
    New-Item -ItemType Directory -Path $ArchiveDir -Force | Out-Null
    Write-Host "创建归档目录: $ArchiveDir"
}

# 获取日期后缀
$DateSuffix = Get-Date -Format "yyyyMMdd_HHmmss"

# 创建归档子目录
$ArchivePath = Join-Path $ArchiveDir "backup_$DateSuffix"
New-Item -ItemType Directory -Path $ArchivePath -Force | Out-Null

# 复制文件到归档目录
Get-ChildItem -Path $SourceDir -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($SourceDir.Length)
    $targetPath = Join-Path $ArchivePath $relativePath
    $targetDir = Split-Path $targetPath -Parent
    
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    }
    
    Copy-Item $_.FullName -Destination $targetPath -Force
}

Write-Host "归档完成: $ArchivePath"

# 清理旧归档（保留最近 N 个）
$Archives = Get-ChildItem -Path $ArchiveDir -Directory | Sort-Object Name -Descending
if ($Archives.Count -gt $KeepCount) {
    $Archives | Select-Object -Skip $KeepCount | ForEach-Object {
        Remove-Item $_.FullName -Recurse -Force
        Write-Host "删除旧归档: $($_.Name)"
    }
}

Write-Host "当前保留归档: $KeepCount 个"
`;
    
    return script.trim();
  },
  
  /**
   * 生成版本报告
   */
  generateVersionReport(currentVersion, changes) {
    const lines = [];
    const date = new Date().toLocaleString();
    
    lines.push('========================================');
    lines.push('   版本发布报告');
    lines.push('========================================');
    lines.push('');
    lines.push(`📦 当前版本: ${currentVersion}`);
    lines.push(`📅 发布时间: ${date}`);
    lines.push(`📝 变更数量: ${changes.length}`);
    lines.push('');
    
    lines.push('📋 变更清单:');
    changes.forEach((c, i) => {
      const icons = {
        added: '✨',
        changed: '🔄',
        fixed: '🐛',
        removed: '🗑️'
      };
      lines.push(`   ${i + 1}. ${icons[c.type] || '•'} [${c.module}] ${c.description}`);
    });
    
    lines.push('');
    lines.push('========================================');
    
    return lines.join('\n');
  }
};

// 导出
window.VersionManager = VersionManager;

console.log('[VersionManager] 版本管理工具加载完成 ✅');
