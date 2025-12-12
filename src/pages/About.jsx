import React from 'react'

import img1 from '../assets/images/about-01.jpg'
import img2 from '../assets/images/about-02.jpg'
const About = () => {
	return (
		<div>
			{/* <!-- Title page --> */}
			{/* <section class="bg-img1 txt-center p-lr-15 p-tb-92" >
				<h2 class="ltext-105 cl0 txt-center ">
					About
				</h2>
			</section> */}


			{/* <!-- Content page --> */}
			<section class="bg0 p-t-75 p-b-120">
				<div class="container">
					<div class="row p-b-148">
						<div class="col-md-7 col-lg-8">
							<div class="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
								<h3 class="mtext-111 cl2 p-b-16">
									Nuestra Historia
								</h3>

								<p class="stext-113 cl6 p-b-26">
									Desde nuestro inicio, nos propusimos ir más allá de la simple venta de productos tecnológicos. Creemos que la innovación debe ser accesible para todos. Nuestra misión es equipar a las mentes creativas y a los profesionales audaces con las herramientas de vanguardia que necesitan para transformar sus ideas en realidad. Cada gadget, cada componente, es seleccionado rigurosamente para garantizar rendimiento y fiabilidad.						</p>

								<p class="stext-113 cl6 p-b-26">
									Comenzamos como un pequeño equipo apasionado por la electrónica y los dispositivos inteligentes. Rápidamente, entendimos que el mercado necesitaba un lugar donde la calidad no estuviera reñida con el precio justo y donde la experiencia de compra fuera tan fluida como la tecnología que ofrecemos. Esta filosofía nos ha guiado. Nuestro catálogo crece constantemente, abarcando desde los últimos smartphones y wearables hasta hardware de alto rendimiento para gaming y desarrollo.						</p>

								<p class="stext-113 cl6 p-b-26">
									Nos esforzamos por ofrecer una plataforma intuitiva y segura, poniendo siempre al cliente en el centro de todo lo que hacemos. No solo vendemos tecnología; vendemos soluciones y futuro. Queremos que cada compra sea el primer paso hacia una nueva y emocionante experiencia digital. Somos tu socio en la evolución tecnológica diaria, ofreciendo soporte experto y envíos rápidos.						</p>
							</div>
						</div>

						<div class="col-11 col-md-5 col-lg-4 m-lr-auto">
							<div class="how-bor1 ">
								<div class="hov-img0">
									<img src={img1} alt="IMG" />
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="order-md-2 col-md-7 col-lg-8 p-b-30">
							<div class="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
								<h3 class="mtext-111 cl2 p-b-16">
									Nuestra Mision
								</h3>

								<p class="stext-113 cl6 p-b-26">
									Nuestra razón de ser es simple: hacer que la tecnología más avanzada sea una herramienta al alcance de todos para crear y prosperar. No vemos los gadgets como simples objetos, sino como catalizadores para nuevas ideas. Nos dedicamos a seleccionar cuidadosamente cada producto, priorizando aquellos que ofrecen el mayor potencial para la productividad, la inspiración y la conexión.						</p>

								<div class="bor16 p-l-29 p-b-9 m-t-22">
									<p class="stext-114 cl6 p-r-40 p-b-11">
										"La creatividad es solo conectar cosas. Cuando le preguntas a la gente creativa cómo hicieron algo, se sienten un poco culpables porque realmente no lo hicieron, solo vieron algo. Les pareció obvio después de un tiempo."

										— Steve Jobs							</p>

									<span class="stext-111 cl8">
										- Steve Job’s
									</span>
								</div>
							</div>
						</div>

						<div class="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
							<div class="how-bor2">
								<div class="hov-img0">
									<img src={img2} alt="IMG" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>


		</div>
	)
}

export default About
