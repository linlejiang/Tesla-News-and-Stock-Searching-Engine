import http from '../http-common';

class mysqlService {
    getAll(group, start_date, end_date) {
        return http.get(`/articles/all/${group}/${start_date}/${end_date}`);
    };

    get_topic(topic, group, start_date, end_date) {
        return http.get(`/articles/topic/${topic}/${group}/${start_date}/${end_date}`);
    };

    get_publisher(publisher, group, start_date, end_date) {
        return http.get(`/articles/publisher/${publisher}/${group}/${start_date}/${end_date}`);
    };

    get_headline(headline, group, start_date, end_date) {
        return http.get(`/articles/headline/${headline}/${group}/${start_date}/${end_date}`);
    };

    get_content(content, group, start_date, end_date) {
        return http.get(`/articles/content/${content}/${group}/${start_date}/${end_date}`);
    };

    get_articleId(articleId) {
        return http.get(`/articles/articleId/${articleId}`);
    };

    get_single_date(date) {
        return http.get(`/articles/single_date/${date}`);
    };
}

export default new mysqlService();