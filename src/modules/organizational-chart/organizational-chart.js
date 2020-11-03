
import React from 'react'
import "./_chart.scss"
const EmployeeChart = (props) => {
  return (
    <div className="pg-orgchart">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="org-chart">
        <ul>
          <li>
            <div className="user">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
              <div className="name">Arvind K</div>
              <div className="role">CEO</div>
              <a className="manager" href="#">Arvind K</a>
            </div>
            <ul>
              <li>
                <div className="user">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                  <div className="name">Nana L</div>
                  <div className="role">CO-CEO</div>
                  <a className="manager" href="#">Arvind K</a>
                </div>
              </li>
              <li>
                <div className="user">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                  <div className="name">Nikunj S</div>
                  <div className="role">Chief Operating Officer</div>
                  <a className="manager" href="#">Arvind K</a>
                </div>
                <ul>
                  <li>
                    <div className="user">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                      <div className="name">Kel Custodio</div>
                      <div className="role">Lead Developer</div>
                      <a className="manager" href="#">Nikunj S</a>
                    </div>
                    <ul>
                      <li><div className="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                        <div className="name">Sachin Savale</div>
                        <div className="role">Technical Lead</div>
                        <a className="manager" href="#">Kel Custodio</a>
                      </div>
                      <ul>
                      <li><div className="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                        <div className="name">Shahbudin Kaji</div>
                        <div className="role">Technical Support</div>
                        <a className="manager" href="#">Sachin Savale</a>
                      </div>
                      </li>
                      <li><div className="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                        <div className="name">Jaydas Sakhare</div>
                        <div className="role">Technical Support</div>
                        <a className="manager" href="#">Sachin Savale</a>
                      </div>
                      </li>
                      <li><div className="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                        <div className="name">Vishal Pitale</div>
                        <div className="role">Technical Support</div>
                        <a className="manager" href="#">Sachin Savale</a>
                      </div>
                      </li>
                      <li><div className="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                        <div className="name">Madhu Rai</div>
                        <div className="role">Technical Support</div>
                        <a className="manager" href="#">Sachin Savale</a>
                      </div>
                      </li>
                      </ul>
                      </li>
                      <li>
                        <div className="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                        <div className="name">Nitesh Devadiga</div>
                        <div className="role">Developer</div>
                        <a className="manager" href="#">Kel Custodio</a>
                      </div>
                      </li>
                      <li><div className="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                        <div className="name">Amol Jagkar</div>
                        <div className="role">Developer</div>
                        <a className="manager" href="#">Kel Custodio</a>
                      </div></li>
                    </ul>
                  </li>
                  <li>
                    <div className="user">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                      <div className="name">Manisha H</div>
                      <div className="role">Developer</div>
                      <a className="manager" href="#">Nikunj S</a>
                    </div>
                  </li>
                  <li>
                    <div className="user">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className="img-responsive" />
                      <div className="name">Moses R</div>
                      <div className="role">Developer</div>
                      <a className="manager" href="#">Nikunj S</a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeChart;

