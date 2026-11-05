// ==================== 数据持久化（GitHub 版本 - 无 localStorage 缓存）====================
    // GitHub 版本不使用 localStorage，数据从 data.json 加载

    function saveState() {
        // GitHub 版本不保存数据到 localStorage
        console.log('GitHub version: data saved to data.json');
    }

    function loadState() {
        // GitHub 版本不从 localStorage 加载数据
        return false;
    }

    // ==================== 自动加载 data.json ====================
    (function() {
        window.addEventListener('load', function() {
            setTimeout(function() {
                var baseUrl = window.location.origin + window.location.pathname;
                var dataUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1) + 'data.json?t=' + Date.now();
                fetch(dataUrl)
                    .then(function(resp) {
                        if (!resp.ok) throw new Error('Not found');
                        return resp.json();
                    })
                    .then(function(d) {
                        if (!d || typeof S === 'undefined') return;
                        
                        S.master = new Map(d.master || []);
                        S.stock = new Map(d.stock || []);
                        S.stockDesc = d.stockDesc || {};
                        S.bo = new Map(d.bo || []);
                        S.boSnapshots = d.boSnapshots || [];
                        S.salesMonthly = d.salesMonthly || {};
                        S.salesDealer = d.salesDealer || {};
                        S.shipment = new Map(d.shipment || []);
                        S.inTransitCalc = d.inTransitCalc || {};
                        S.orderMonthly = d.orderMonthly || {};
                        S.shipMonthly = d.shipMonthly || {};
                        S.orderTypes = d.orderTypes || {};
                        S.loaded = new Set(d.loaded || []);
                        
                        if (typeof hideLoading === 'function') hideLoading();
                        
                        setTimeout(function() {
                            try { if (typeof recalculate === 'function') recalculate(); } catch(e) {}
                            try { if (typeof renderAnalysis === 'function') renderAnalysis(); } catch(e) {}
                            try { if (typeof renderCharts === 'function') renderCharts(); } catch(e) {}
                            try { if (typeof renderBOStats === 'function') renderBOStats(); } catch(e) {}
                            try { if (typeof renderBOHistory === 'function') renderBOHistory(); } catch(e) {}
                            try { if (typeof renderBOTable === 'function') renderBOTable(); } catch(e) {}
                            try { if (typeof renderPlan === 'function') renderPlan(); } catch(e) {}
                            try { if (typeof updateImportSummary === 'function') updateImportSummary(); } catch(e) {}
                            console.log('✅ Data restored from data.json');
                        }, 500);
                    })
                    .catch(function() {
                        if (typeof hideLoading === 'function') hideLoading();
                    });
            }, 1000);
        });
    })();
