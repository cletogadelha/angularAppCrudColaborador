'use strict';

app.controller('ColabCtrl', ['$scope', '$resource', 'Colab', 'Map', '$routeParams', '$window', '$http',
      function($scope, $resource, Colab, Map, $routeParams, $window, $http) {


        $scope.objFlow = {};
        $scope.iconeContato = '';
        $scope.mensagemSucesso = '';
        $scope.messageErro = '';
        $scope.place = {};

          if ($routeParams.idColab) {
            Colab.get({
                id: $routeParams.idColab
              })
              .$promise.then(function(colab) {
                $scope.colaborador = colab;
                Map.init();
                if ($scope.colaborador.endereco) {
                  $scope.search();
                }
              });
          } else {
            $scope.colaborador = {
              id: '',
              imagem: '',
              nome: '',
              localTrabalho: '',
              biografia: '',
              profissao: '',
              competencias: [],
              listaContatos: [],
              endereco: ''
            }
          }

          $scope.profissoesDisponiveis = [{
            profissao: 'Desenvolvedor de Software'
          }, {
            profissao: 'Engenheiro de Software'
          }, {
            profissao: 'Gerente de Projetos'
          }]

          $scope.localTrabalhoDisponiveis = [{
            localizacao: 'Fábrica de Software'
          }, {
            localizacao: 'Alocado no Cliente A'
          }, {
            localizacao: 'Alocado no Cliente B'
          }]

          $scope.setProfissao = function(selected) {
            $scope.colaborador.profissao = selected.originalObject.profissao;
          }

          $scope.setLocalTrabalho = function(selected) {
            $scope.colaborador.localTrabalho = selected.originalObject.localizacao;
          }

          $scope.competenciaDisponiveis = [{
            descricao: 'Java'
          }, {
            descricao: 'JavaEE'
          }, {
            descricao: 'Spring'
          }, {
            descricao: 'Angular'
          }, {
            descricao: 'MEAN'
          }]

          $scope.removeColaborador = function(id) {
            Colab.delete({
              id: $scope.colaborador.id
            }, function() {
              $scope.mensagemSucesso = "Colaborador Removido com sucesso!";
              $window.location.href = '#/lista';
            });
          }

          $scope.setaClasseContato = function(descricao) {
            if (descricao === 'Telefone Fixo') {
              return 'fa fa-phone fa-2x';
            } else if (descricao === 'Telefone Celular') {
              return 'fa fa-mobile fa-2x';
            } else if (descricao === 'E-Mail') {
              return 'fa fa-inbox fa-2x';
            } else if (descricao === 'Facebook') {
              return 'fa fa-facebook fa-2x';
            } else if (descricao === 'Linkedin') {
              return 'fa fa-linkedin fa-2x';
            } else if (descricao === 'Google+') {
              return 'fa fa-google-plus fa-2x';
            }
          }

          $scope.contatosDisponiveis = [{
            descricao: 'Telefone Fixo',
          }, {
            descricao: 'Telefone Celular',
          }, {
            descricao: 'E-Mail',
          }, {
            descricao: 'Facebook',
          }, {
            descricao: 'Linkedin',
          }, {
            descricao: 'Google+',
          }]

          $scope.contatoSelecionado = $scope.contatosDisponiveis[0];
          $scope.contato = '';

          $scope.insereContato = function() {
            var novoContatoColab = {
              tipo: $scope.contatoSelecionado.descricao,
              contato: $scope.contato
            }
            $scope.colaborador.listaContatos.push(novoContatoColab);
            $scope.contatoSelecionado = $scope.contatosDisponiveis[0]
            $scope.contato = '';
          }

          $scope.removeContato = function(contato) {
            var index = $scope.colaborador.listaContatos.indexOf(contato);
            $scope.colaborador.listaContatos.splice(index, 1);
          }

          $scope.resetFormCampo = function(form) {
            if (form) {
              form.contato.$setPristine();
            }
          }

          $scope.uploadArquivo = function() {
            alert('teste')
          }

          $scope.salvarColaborador = function() {

            $scope.mensagemSucesso = '';
            $scope.messageErro = '';

            var colab = new Colab($scope.colaborador);

            colab.$save()
              .then(function(res) {
                $scope.mensagemSucesso = "Colaborador Salvo com sucesso!";

                $scope.contatosInseridos = [];
                $scope.contato = '';
                $scope.searchPlace = '';

                $scope.colaborador = {
                  id: '',
                  imagem: '',
                  nome: '',
                  localTrabalho: '',
                  biografia: '',
                  profissao: '',
                  competencias: '',
                  listaContatos: [],
                  endereco: ''
                }
              })
              .catch(function(req) {
                $scope.messageErro = "Erro ao salvar o colaborador;"
              });

            var element = $window.document.getElementById('cabecalho').scrollIntoView();

          }

          $scope.map = {
            "center": {
              "latitude": 52.47491894326404,
              "longitude": -1.8684210293371217
            },
            "zoom": 15
          };

          $scope.search = function() {
            $scope.apiError = false;
            Map.search($scope.colaborador.endereco)
              .then(
                function(res) {
                  Map.addMarker(res);
                  $scope.place.name = res.name;
                  $scope.place.lat = res.geometry.location.lat();
                  $scope.place.lng = res.geometry.location.lng();
                },
                function(status) { // error
                  $scope.apiError = true;
                  $scope.apiStatus = status;
                  $scope.messageErro = "Erro ao carregar o mapa;"
                }
              );
          }

          Map.init();
        }




        //UPload da Imagem - Not Working
        /*        $scope.upload = function() {

                  var fd = new FormData();
                  fd.append('file', $scope.objFlow.flow.files[0]);

                  var request = {
                    method: 'POST',
                    url: 'http://localhost:8080/SpringAngular/rest/colaborador/upload/',
                    data: fd,
                    headers: {
                      'Content-Type': undefined
                    }
                  }

                    $http(request)
                    .success(function() {})
                    .error(function() {});
                  } */
      ]);
