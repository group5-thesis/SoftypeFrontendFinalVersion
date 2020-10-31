
import React from 'react'
import "./_card.scss"
const EmployeeChart = (props) => {
  return (
    <div class="pg-orgchart">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div class="org-chart">
        <ul>
          <li>
            <div class="user">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
              <div class="name">Arvind K</div>
              <div class="role">CEO</div>
              <a class="manager" href="#">Arvind K</a>
            </div>
            <ul>
              <li>
                <div class="user">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                  <div class="name">Nana L</div>
                  <div class="role">CO-CEO</div>
                  <a class="manager" href="#">Arvind K</a>
                </div>
              </li>
              <li>
                <div class="user">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                  <div class="name">Nikunj S</div>
                  <div class="role">Chief Operating Officer</div>
                  <a class="manager" href="#">Arvind K</a>
                </div>
                <ul>
                  <li>
                    <div class="user">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                      <div class="name">Kel Custodio</div>
                      <div class="role">Lead Developer</div>
                      <a class="manager" href="#">Nikunj S</a>
                    </div>
                    <ul>
                      <li><div class="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                        <div class="name">Sachin Savale</div>
                        <div class="role">Technical Lead</div>
                        <a class="manager" href="#">Kel Custodio</a>
                      </div>
                      <ul>
                      <li><div class="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                        <div class="name">Shahbudin Kaji</div>
                        <div class="role">Technical Support</div>
                        <a class="manager" href="#">Sachin Savale</a>
                      </div>
                      </li>
                      <li><div class="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                        <div class="name">Jaydas Sakhare</div>
                        <div class="role">Technical Support</div>
                        <a class="manager" href="#">Sachin Savale</a>
                      </div>
                      </li>
                      <li><div class="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                        <div class="name">Vishal Pitale</div>
                        <div class="role">Technical Support</div>
                        <a class="manager" href="#">Sachin Savale</a>
                      </div>
                      </li>
                      <li><div class="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                        <div class="name">Madhu Rai</div>
                        <div class="role">Technical Support</div>
                        <a class="manager" href="#">Sachin Savale</a>
                      </div>
                      </li>
                      </ul>
                      </li>
                      <li>
                        <div class="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                        <div class="name">Nitesh Devadiga</div>
                        <div class="role">Developer</div>
                        <a class="manager" href="#">Kel Custodio</a>
                      </div>
                      </li>
                      <li><div class="user">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                        <div class="name">Amol Jagkar</div>
                        <div class="role">Developer</div>
                        <a class="manager" href="#">Kel Custodio</a>
                      </div></li>
                    </ul>
                  </li>
                  <li>
                    <div class="user">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                      <div class="name">Manisha H</div>
                      <div class="role">Developer</div>
                      <a class="manager" href="#">Nikunj S</a>
                    </div>
                  </li>
                  <li>
                    <div class="user">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" class="img-responsive" />
                      <div class="name">Moses R</div>
                      <div class="role">Developer</div>
                      <a class="manager" href="#">Nikunj S</a>
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

